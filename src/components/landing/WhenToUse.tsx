import { Plus, RefreshCw, Sun, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const scenarios = [
  { icon: Plus, title: "Новая родинка или пятно", desc: "Появилось что‑то новое — стоит проверить" },
  { icon: RefreshCw, title: "Родинка меняет вид", desc: "Изменился цвет, форма, размер" },
  { icon: Sun, title: "После активного солнца", desc: "Проверка после длительного загара или ожога" },
  { icon: CalendarDays, title: "Регулярный самоконтроль", desc: "Привычка раз в 3–6 месяцев — лучшая профилактика" },
];

export default function WhenToUse() {
  return (
    <section id="when" className="section-padding" aria-labelledby="when-title">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="when-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
              Когда стоит использовать SkinDoctor
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">Ситуации, в которых оценка риска особенно полезна</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" stagger={0.1}>
          {scenarios.map((s) => (
            <StaggerItem key={s.title}>
              <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col items-start h-full">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <s.icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-display text-base font-700 text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Button size="lg" className="rounded-xl px-8 py-6 text-base shadow-elevated" asChild>
              <a href="https://t.me/Skin_Doctor_bot" target="_blank" rel="noopener noreferrer">Проверить родинку</a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
