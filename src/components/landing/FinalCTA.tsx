import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

export default function FinalCTA() {
  return (
    <section id="booking" className="section-padding bg-hero-gradient" aria-labelledby="booking-title">
      <ScrollReveal>
        <div className="container mx-auto max-w-lg text-center">
          <h2 id="booking-title" className="font-display text-2xl md:text-3xl font-800 text-foreground mb-3">
            Проверить родинку
          </h2>
          <p className="text-muted-foreground mb-8">
            Быстро и без лишних шагов — отправьте фото боту в Telegram
          </p>
          <Button size="lg" className="w-full max-w-sm rounded-xl text-base h-14" asChild>
            <a
              href="https://t.me/Skin_Doctor_bot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_final_cta")}
            >
              <MessageCircle size={20} className="mr-2" />
              Проверить родинку
            </a>
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
