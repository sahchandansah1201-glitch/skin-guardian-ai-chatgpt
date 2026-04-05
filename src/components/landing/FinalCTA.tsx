import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useSkinCheck } from "@/components/skin-check/SkinCheckContext";

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

export default function FinalCTA() {
  const { open } = useSkinCheck();

  return (
    <section id="booking" className="section-padding bg-hero-gradient" aria-labelledby="booking-title">
      <ScrollReveal>
        <div className="container mx-auto max-w-lg text-center">
          <h2 id="booking-title" className="font-display text-2xl md:text-3xl font-800 text-foreground mb-3">
            Проверить родинку
          </h2>
          <p className="text-muted-foreground mb-8">
            Загрузите фото прямо на сайте — AI проанализирует и даст предварительную оценку
          </p>
          <Button size="lg" className="w-full max-w-sm rounded-xl text-base h-14" onClick={() => { trackEvent("click_final_cta"); open(); }}>
            <MessageCircle size={20} className="mr-2" />
            Проверить родинку
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
