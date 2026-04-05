import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Send as SendIcon } from "lucide-react";
import type { ContactData } from "./SkinCheckModal";

function detectContactType(value: string): ContactData["type"] {
  const trimmed = value.trim();
  if (trimmed.startsWith("@") || trimmed.includes("t.me/")) return "telegram";
  if (trimmed.includes("@")) return "email";
  return "phone";
}

export default function StepContact({ onSubmit }: { onSubmit: (data: ContactData) => void }) {
  const [value, setValue] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || !agreed) return;
    onSubmit({ value: value.trim(), type: detectContactType(value) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-2">
      <p className="text-sm text-muted-foreground">
        Укажите, куда отправить развёрнутый результат анализа. Мы не используем ваши данные для рассылок.
      </p>

      <div>
        <Label htmlFor="contact-input" className="text-sm font-medium">
          Email, телефон или Telegram
        </Label>
        <div className="relative mt-2">
          <Input
            id="contact-input"
            type="text"
            placeholder="email@example.com, +7... или @username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-xl pr-10"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {detectContactType(value) === "email" ? <Mail size={16} /> : <Phone size={16} />}
          </div>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 rounded border-border text-secondary focus:ring-secondary"
          required
        />
        <span className="text-xs text-muted-foreground">
          Я согласен(а) на обработку персональных данных. Результат не является диагнозом — обратитесь к врачу при сомнениях.
        </span>
      </label>

      <Button type="submit" size="lg" className="w-full rounded-xl" disabled={!value.trim() || !agreed}>
        Далее <SendIcon size={16} className="ml-2" />
      </Button>
    </form>
  );
}
