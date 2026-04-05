import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Send } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

const interests = [
  { value: "mole", label: "Родинка / новообразование" },
  { value: "skin", label: "Прыщи / розацеа / другое" },
  { value: "prevention", label: "Профилактика и самоконтроль" },
  { value: "appointment", label: "Хочу записаться на приём" },
];

export default function LeadCapture() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contact, setContact] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    trackEvent("start_form_lead");
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    trackEvent("submit_form_lead");
    setStep(3);
  };

  const toggleInterest = (v: string) => {
    setSelected((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  };

  if (step === 3) {
    return (
      <section id="lead" className="section-padding" aria-labelledby="lead-title">
        <ScrollReveal>
          <div className="container mx-auto max-w-lg text-center">
            <CheckCircle2 size={56} className="text-success mx-auto mb-4" />
            <h2 id="lead-title" className="font-display text-2xl font-800 text-foreground mb-2">Спасибо!</h2>
            <p className="text-muted-foreground mb-8">Чек‑лист и напоминания отправлены. Что дальше?</p>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl" asChild>
                <a href="#booking">Записаться на приём</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl" asChild>
                <a href="#photo-guide">Как правильно сфотографировать</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl" asChild>
                <a href="https://t.me/Skin_Doctor_bot" target="_blank" rel="noopener noreferrer">Написать @Skin_Doctor_bot</a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section id="lead" className="section-padding" aria-labelledby="lead-title">
      <ScrollReveal>
        <div className="container mx-auto max-w-lg">
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-elevated">
            <h2 id="lead-title" className="font-display text-2xl md:text-3xl font-800 text-foreground text-center mb-2">
              Получите чек‑лист самопроверки
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              + напоминания о регулярном осмотре
            </p>

            {step === 1 && (
              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <Label htmlFor="contact" className="text-sm font-medium text-foreground">
                    Куда прислать? <span className="text-muted-foreground font-normal">(Email, телефон или Telegram)</span>
                  </Label>
                  <Input
                    id="contact"
                    type="text"
                    placeholder="email@example.com или +7..."
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-2 rounded-xl"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Мы используем контакт только для отправки материалов</p>
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl">
                  Далее <Send size={16} className="ml-2" />
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStep2} className="space-y-4">
                <fieldset>
                  <legend className="text-sm font-medium text-foreground mb-3">Что вас интересует?</legend>
                  <div className="space-y-2">
                    {interests.map((i) => (
                      <label key={i.value} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-secondary/40 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selected.includes(i.value)}
                          onChange={() => toggleInterest(i.value)}
                          className="rounded border-border text-secondary focus:ring-secondary"
                        />
                        <span className="text-sm text-foreground">{i.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 rounded border-border text-secondary focus:ring-secondary"
                    required
                  />
                  <span className="text-xs text-muted-foreground">
                    Я согласен(а) на обработку персональных данных в соответствии с{" "}
                    <a href="#" className="text-primary underline">политикой конфиденциальности</a>.
                  </span>
                </label>

                <Button type="submit" size="lg" className="w-full rounded-xl" disabled={!agreed}>
                  Получить чек‑лист
                </Button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
