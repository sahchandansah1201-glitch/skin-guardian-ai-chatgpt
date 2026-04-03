import { Sun, Focus, Ruler, ZapOff, RotateCcw } from "lucide-react";

const rules = [
  { icon: Sun, title: "Хорошее естественное освещение", desc: "Дневной свет без прямых солнечных лучей" },
  { icon: Focus, title: "Чёткий фокус на новообразовании", desc: "Убедитесь, что камера сфокусирована и изображение не размыто" },
  { icon: Ruler, title: "Расстояние 10–15 см", desc: "Достаточно близко для деталей, но без искажений" },
  { icon: ZapOff, title: "Без вспышки и бликов", desc: "Вспышка даёт блик и искажает цвета — отключите её" },
  { icon: RotateCcw, title: "2–3 ракурса", desc: "Прямо, сбоку и с небольшим наклоном для полноты картины" },
];

export default function PhotoGuide() {
  return (
    <section id="photo-guide" className="section-padding bg-card" aria-labelledby="photo-title">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 id="photo-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
            Как сделать правильное фото
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            5 простых правил для точной оценки
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {rules.map((r, i) => (
            <div key={r.title} className="bg-background rounded-2xl p-5 shadow-soft text-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
                <r.icon size={22} className="text-secondary" />
              </div>
              <span className="text-xs font-700 text-secondary mb-2 block">Правило {i + 1}</span>
              <h3 className="font-display text-sm font-700 text-foreground mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
