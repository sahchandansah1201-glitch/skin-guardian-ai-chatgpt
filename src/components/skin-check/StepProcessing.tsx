import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AnalysisResult } from "./SkinCheckModal";

export default function StepProcessing({
  checkId,
  onDone,
}: {
  checkId: string;
  onDone: (result: AnalysisResult) => void;
}) {
  const [statusText, setStatusText] = useState("Отправляем фото на анализ...");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // Call the edge function
        setStatusText("AI анализирует изображение...");

        const { data, error } = await supabase.functions.invoke("analyze-skin", {
          body: { checkId },
        });

        if (cancelled) return;

        if (error) {
          toast.error("Ошибка анализа: " + error.message);
          return;
        }

        if (data?.result) {
          onDone(data.result as AnalysisResult);
        } else if (data?.error) {
          toast.error(data.error);
        }
      } catch (err: any) {
        if (!cancelled) {
          toast.error("Ошибка: " + (err.message || "попробуйте позже"));
        }
      }
    };

    run();

    // Progress text animation
    const timers = [
      setTimeout(() => !cancelled && setStatusText("Распознаём тип новообразования..."), 3000),
      setTimeout(() => !cancelled && setStatusText("Оцениваем уровень риска..."), 7000),
      setTimeout(() => !cancelled && setStatusText("Формируем заключение..."), 12000),
    ];

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [checkId, onDone]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
          <Loader2 size={32} className="text-secondary animate-spin" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-foreground">{statusText}</p>
        <p className="text-xs text-muted-foreground">Обычно это занимает 10–20 секунд</p>
      </div>
    </div>
  );
}
