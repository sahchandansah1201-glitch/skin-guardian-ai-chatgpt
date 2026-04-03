import { ShieldCheck, Lock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

const trustBullets = [
  { icon: ShieldCheck, text: "Не диагноз — триаж и маршрут к врачу" },
  { icon: Lock, text: "Приватность данных и шифрование" },
  { icon: UserCheck, text: "Врач подтверждает тактику" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-16"
      aria-label="Главный экран"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-[0.04]" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-800 leading-[1.1] tracking-tight text-foreground"
          >
            Оцените риск новообразований кожи — <span className="text-gradient">с поддержкой AI и врача</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Интеллектуальная система помогает заметить тревожные изменения кожи и направляет вас к&nbsp;нужному специалисту. Быстро, прозрачно, безопасно.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="text-base px-8 py-6 rounded-xl shadow-elevated" asChild>
              <a href="#booking" onClick={() => trackEvent("click_book_primary")}>Записаться на приём</a>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl" asChild>
              <a href="#lead" onClick={() => trackEvent("click_lead_secondary")}>Получить чек‑лист и напоминания</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8"
          >
            {trustBullets.map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <b.icon size={18} className="text-secondary shrink-0" />
                <span>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground/60 px-4">
          SkinDoctor не является диагнозом и не заменяет консультацию врача. При сомнениях обратитесь к дерматологу.
        </p>
      </div>
    </section>
  );
}
