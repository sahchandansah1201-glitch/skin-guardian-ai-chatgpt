import { useState, useRef, useEffect, useCallback } from "react";
import { Sun, Focus, Ruler, ZapOff, RotateCcw } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const rules = [
  { icon: Sun, title: "Хорошее естественное освещение", desc: "Дневной свет без прямых солнечных лучей" },
  { icon: Focus, title: "Чёткий фокус на новообразовании", desc: "Убедитесь, что камера сфокусирована и изображение не размыто" },
  { icon: Ruler, title: "Расстояние 10–15 см", desc: "Достаточно близко для деталей, но без искажений" },
  { icon: ZapOff, title: "Без вспышки и бликов", desc: "Вспышка даёт блик и искажает цвета — отключите её" },
  { icon: RotateCcw, title: "2–3 ракурса", desc: "Прямо, сбоку и с небольшим наклоном для полноты картины" },
];

function RuleCard({ rule, index }: { rule: typeof rules[0]; index: number }) {
  return (
    <div className="bg-background rounded-2xl p-6 shadow-soft h-full flex flex-col items-center text-center min-w-[260px] lg:min-w-0">
      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
        <rule.icon size={24} className="text-secondary" />
      </div>
      <span className="text-xs font-700 text-secondary mb-2 block">Правило {index + 1}</span>
      <h3 className="font-display text-base font-700 text-foreground mb-2">{rule.title}</h3>
      <p className="text-sm text-muted-foreground">{rule.desc}</p>
    </div>
  );
}

export default function PhotoGuide() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section id="photo-guide" className="section-padding bg-card" aria-labelledby="photo-title">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 id="photo-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
              Как сделать правильное фото
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              5 простых правил для точной оценки
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop: full-width grid */}
        <div className="hidden lg:grid grid-cols-5 gap-6">
          {rules.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <RuleCard rule={r} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Tablet & Mobile: horizontal scroll with progress */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {rules.map((r, i) => (
              <motion.div
                key={r.title}
                className="snap-start shrink-0 w-[75vw] sm:w-[45vw]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <RuleCard rule={r} index={i} />
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-secondary rounded-full"
                style={{ width: `${20 + progress * 80}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
