import { ShieldAlert, AlertTriangle, HeartPulse, Info } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const redFlags = [
  "Родинка быстро увеличивается в размере",
  "Появилась кровоточивость или язвочка",
  "Боль, зуд или жжение в области новообразования",
  "Неравномерная окраска или неровные края",
  "Новообразование не заживает более 3 недель",
];

export default function SafetyLimitations() {
  return (
    <section id="safety" className="section-padding bg-card" aria-labelledby="safety-title">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 id="safety-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
              Безопасность и ограничения
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Прозрачность — наш главный принцип
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <StaggerContainer className="space-y-6" stagger={0.12}>
            <StaggerItem direction="left">
              <div className="flex gap-4">
                <ShieldAlert size={24} className="text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-700 text-foreground mb-1">SkinDoctor НЕ заменяет врача</h3>
                  <p className="text-sm text-muted-foreground">
                    Система не ставит диагноз. Это инструмент поддержки принятия решения: помогает понять, насколько срочно нужна консультация специалиста.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem direction="left">
              <div className="flex gap-4">
                <Info size={24} className="text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-700 text-foreground mb-1">При сомнениях — очный осмотр</h3>
                  <p className="text-sm text-muted-foreground">
                    Даже при низком уровне риска мы рекомендуем регулярное наблюдение у дерматолога. AI — помощник, не замена клинического опыта.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem direction="left">
              <div className="flex gap-4">
                <HeartPulse size={24} className="text-secondary shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-700 text-foreground mb-1">Статус сертификации</h3>
                  <p className="text-sm text-muted-foreground">
                    Система находится на этапе клинической оценки. Мы придерживаемся строгих стандартов безопасности и работаем с врачебным сообществом.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="bg-destructive/5 border border-destructive/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-destructive" />
                <h3 className="font-display text-lg font-700 text-foreground">
                  Обратитесь к врачу, если:
                </h3>
              </div>
              <ul className="space-y-3">
                {redFlags.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-2" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Это общие рекомендации. Каждый случай индивидуален — проконсультируйтесь с дерматологом.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
