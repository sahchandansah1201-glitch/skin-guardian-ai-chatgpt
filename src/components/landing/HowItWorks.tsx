import { Camera, Brain, CalendarCheck } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const steps = [
  {
    icon: Camera,
    title: "Сделайте фото по инструкции",
    desc: "Следуйте простым правилам съёмки — хорошее освещение, без вспышки, с нескольких ракурсов. Система подскажет, если фото некачественное, и попросит переснять.",
    tip: "5 правил хорошего фото — в разделе ниже",
  },
  {
    icon: Brain,
    title: "Оценка риска нейросетью",
    desc: "AI‑модель, обученная на ~16 000 клинических изображений, оценивает характеристики новообразования и определяет уровень риска. Это не диагноз — это триаж.",
    tip: "При неопределённости — рекомендация обратиться к врачу",
  },
  {
    icon: CalendarCheck,
    title: "Рекомендация и запись к врачу",
    desc: "Вы получаете понятный план действий: наблюдение, повторная проверка или консультация специалиста. Записаться можно сразу — в один клик.",
    tip: "Врач подтверждает тактику и назначает лечение",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-card" aria-labelledby="how-title">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 id="how-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
              Как это работает
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Три простых шага от фото до плана действий
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" stagger={0.12}>
          {steps.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="relative bg-background rounded-2xl p-8 shadow-card h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent mb-6">
                  <s.icon size={28} className="text-secondary" />
                </div>
                <span className="absolute top-8 right-8 font-display text-5xl font-800 text-muted/60">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-700 text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <p className="text-xs text-secondary font-medium">{s.tip}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
