import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ContactData } from "./SkinCheckModal";

export default function StepUpload({
  contact,
  onUploaded,
}: {
  contact: ContactData;
  onUploaded: (checkId: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.error("Пожалуйста, выберите изображение");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("Файл слишком большой (макс. 10 МБ)");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleSubmit = async () => {
    if (!file) return;
    setUploading(true);

    try {
      // Generate unique path
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;

      // Upload photo to storage
      const { error: uploadError } = await supabase.storage
        .from("skin-photos")
        .upload(path, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      // Create skin_check record
      const { data: check, error: insertError } = await supabase
        .from("skin_checks")
        .insert({
          contact_info: contact.value,
          contact_type: contact.type,
          photo_path: path,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      onUploaded(check.id);
    } catch (err: any) {
      console.error(err);
      toast.error("Ошибка загрузки: " + (err.message || "попробуйте ещё раз"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-5 mt-2">
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
            dragOver ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("photo-input")?.click()}
        >
          <ImagePlus size={40} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Перетащите фото сюда
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            или нажмите для выбора файла (JPEG, PNG, до 10 МБ)
          </p>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Превью загружаемого фото"
            className="w-full max-h-64 object-contain rounded-xl border border-border"
          />
          <button
            onClick={() => { setFile(null); setPreview(null); }}
            className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
            aria-label="Удалить фото"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <Button
        size="lg"
        className="w-full rounded-xl"
        onClick={handleSubmit}
        disabled={!file || uploading}
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Загрузка...
          </>
        ) : (
          <>
            <Upload size={16} className="mr-2" />
            Отправить на анализ
          </>
        )}
      </Button>
    </div>
  );
}
