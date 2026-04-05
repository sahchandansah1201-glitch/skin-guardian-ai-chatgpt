import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { checkId } = await req.json();
    if (!checkId) {
      return new Response(JSON.stringify({ error: "checkId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the check record
    const { data: check, error: checkError } = await supabase
      .from("skin_checks")
      .select("*")
      .eq("id", checkId)
      .single();

    if (checkError || !check) {
      return new Response(JSON.stringify({ error: "Check not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update status to processing
    await supabase
      .from("skin_checks")
      .update({ status: "processing" })
      .eq("id", checkId);

    // Download the photo from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from("skin-photos")
      .download(check.photo_path);

    if (downloadError || !fileData) {
      await supabase
        .from("skin_checks")
        .update({ status: "failed", ai_result: { error: "Failed to download photo" } })
        .eq("id", checkId);

      return new Response(JSON.stringify({ error: "Failed to download photo" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Convert to base64
    const arrayBuffer = await fileData.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const mimeType = fileData.type || "image/jpeg";

    // Call AI for analysis
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Ты — AI-ассистент дерматолога. Анализируй фото кожных новообразований и давай предварительную оценку.

ВАЖНО: Ты НЕ ставишь диагноз. Ты даёшь предварительную оценку для триажа.

Ответь строго в JSON формате:
{
  "risk_level": "low" | "medium" | "high",
  "risk_label": "Низкий" | "Средний" | "Высокий",
  "object_class": "название типа новообразования на русском",
  "confidence_percent": число от 0 до 100,
  "description": "краткое описание того, что видно на фото (2-3 предложения)",
  "recommendation": "рекомендация по дальнейшим действиям (1-2 предложения)",
  "next_check": "когда рекомендуется следующая проверка"
}

Если на фото нет кожного новообразования или фото некачественное, верни:
{
  "risk_level": "unknown",
  "risk_label": "Не определено", 
  "object_class": "Не удалось определить",
  "confidence_percent": 0,
  "description": "Описание проблемы с фото",
  "recommendation": "Попробуйте сделать более качественное фото",
  "next_check": "—"
}`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Проанализируй это фото кожного новообразования. Дай предварительную оценку риска.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64}`,
                },
              },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "skin_analysis_result",
              description: "Return structured skin analysis result",
              parameters: {
                type: "object",
                properties: {
                  risk_level: { type: "string", enum: ["low", "medium", "high", "unknown"] },
                  risk_label: { type: "string" },
                  object_class: { type: "string" },
                  confidence_percent: { type: "number" },
                  description: { type: "string" },
                  recommendation: { type: "string" },
                  next_check: { type: "string" },
                },
                required: ["risk_level", "risk_label", "object_class", "confidence_percent", "description", "recommendation", "next_check"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "skin_analysis_result" } },
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      let errorMsg = "AI analysis failed";
      if (status === 429) errorMsg = "Слишком много запросов, попробуйте позже";
      if (status === 402) errorMsg = "Сервис временно недоступен";

      await supabase
        .from("skin_checks")
        .update({ status: "failed", ai_result: { error: errorMsg } })
        .eq("id", checkId);

      return new Response(JSON.stringify({ error: errorMsg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    let result;

    // Extract from tool call
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      result = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try to parse content as JSON
      const content = aiData.choices?.[0]?.message?.content || "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        result = {
          risk_level: "unknown",
          risk_label: "Не определено",
          object_class: "Ошибка анализа",
          confidence_percent: 0,
          description: "Не удалось получить результат от AI",
          recommendation: "Попробуйте загрузить другое фото или обратитесь к врачу",
          next_check: "—",
        };
      }
    }

    // Save result
    await supabase
      .from("skin_checks")
      .update({ status: "completed", ai_result: result })
      .eq("id", checkId);

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-skin error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
