import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Send as SendIcon } from "lucide-react";
import type { ContactData } from "./SkinCheckModal";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return "";
  
  let d = digits;
  // Normalize leading 8 to 7 for Russian numbers
  if (d.startsWith("8") && d.length > 1) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  
  let result = "+" + d.slice(0, 1);
  if (d.length > 1) result += " (" + d.slice(1, 4);
  if (d.length > 4) result += ") " + d.slice(4, 7);
  if (d.length > 7) result += "-" + d.slice(7, 9);
  if (d.length > 9) result += "-" + d.slice(9, 11);
  
  return result;
}

function getPhoneDigits(formatted: string): string {
  return formatted.replace(/\D/g, "");
}

export default function StepContact({ onSubmit }: { onSubmit: (data: ContactData) => void }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Allow clearing
    if (!input) { setPhone(""); return; }
    const formatted = formatPhone(input);
    setPhone(formatted);
  };

  const phoneDigits = getPhoneDigits(phone);
  const isPhoneValid = phoneDigits.length === 11;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = isEmailValid && isPhoneValid && agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // Send both as combined contact info
    onSubmit({
      value: JSON.stringify({ email: email.trim(), phone: "+" + phoneDigits }),
      type: "email",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-2">
      <p className="text-sm text-muted-foreground">
        Укажите контакты — мы отправим развёрнутый результат анализа. Данные не используются для рассылок.
      </p>

      <div>
        <Label htmlFor="email-input" className="text-sm font-medium flex items-center gap-1.5">
          <Mail size={14} className="text-muted-foreground" /> Email
        </Label>
        <Input
          id="email-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="example@mail.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl mt-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone-input" className="text-sm font-medium flex items-center gap-1.5">
          <Phone size={14} className="text-muted-foreground" /> Мобильный телефон
        </Label>
        <Input
          ref={phoneRef}
          id="phone-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (999) 123-45-67"
          value={phone}
          onChange={handlePhoneChange}
          className="rounded-xl mt-2"
          required
        />
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

      <Button type="submit" size="lg" className="w-full rounded-xl" disabled={!canSubmit}>
        Далее <SendIcon size={16} className="ml-2" />
      </Button>
    </form>
  );
}
