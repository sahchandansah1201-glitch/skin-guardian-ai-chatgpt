import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("submit_form_booking");
    setSubmitted(true);
  };

  return (
    <section id="booking" className="section-padding bg-hero-gradient" aria-labelledby="booking-title">
      <ScrollReveal>
        <div className="container mx-auto max-w-lg">
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-elevated">
            {submitted ? (
              <div className="text-center">
                <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
                <h2 className="font-display text-2xl font-800 text-foreground mb-2">Заявка отправлена!</h2>
                <p className="text-muted-foreground mb-6">Мы свяжемся с вами для подтверждения записи.</p>
                <Button variant="outline" className="rounded-xl" asChild>
                  <a href="https://t.me/Skin_Doctor_bot" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("click_messenger")}>
                    <MessageCircle size={16} className="mr-2" /> Написать @Skin_Doctor_bot
                  </a>
                </Button>
              </div>
            ) : (
              <>
                <h2 id="booking-title" className="font-display text-2xl md:text-3xl font-800 text-foreground text-center mb-2">
                   Проверить родинку
                </h2>
                <p className="text-center text-muted-foreground mb-8">
                  Быстро и без лишних шагов
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="book-name" className="text-sm">Ваше имя</Label>
                    <Input id="book-name" placeholder="Как к вам обращаться" className="mt-1.5 rounded-xl" required />
                  </div>
                  <div>
                    <Label htmlFor="book-contact" className="text-sm">Телефон или email</Label>
                    <Input id="book-contact" placeholder="+7 (___) ___-__-__" className="mt-1.5 rounded-xl" required />
                    <p className="text-xs text-muted-foreground mt-1">Для подтверждения записи</p>
                  </div>
                  <div>
                    <Label htmlFor="book-time" className="text-sm">Удобное время</Label>
                    <Input id="book-time" placeholder="Например: будни после 18:00" className="mt-1.5 rounded-xl" />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-border text-secondary focus:ring-secondary"
                      required
                    />
                    <span className="text-xs text-muted-foreground">
                      Я согласен(а) на обработку данных в соответствии с{" "}
                      <a href="#" className="text-primary underline">политикой конфиденциальности</a>
                    </span>
                  </label>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-xl"
                    onClick={() => trackEvent("start_form_booking")}
                  >
                    Проверить родинку
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <a
                    href="https://t.me/Skin_Doctor_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => trackEvent("click_messenger")}
                  >
                    Или напишите в мессенджер →
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
