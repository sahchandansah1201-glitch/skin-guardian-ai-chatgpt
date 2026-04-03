import { Star, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    name: "Иванова Елена Сергеевна",
    role: "Врач‑дерматолог, дерматоонколог",
    experience: "Стаж 15 лет",
    certs: "Кандидат мед. наук",
    photo: null, // placeholder
  },
  {
    name: "Петров Алексей Николаевич",
    role: "Врач‑дерматолог, дерматовенеролог",
    experience: "Стаж 12 лет",
    certs: "Высшая категория",
    photo: null,
  },
  {
    name: "Сидорова Мария Дмитриевна",
    role: "Врач‑дерматолог",
    experience: "Стаж 8 лет",
    certs: "Специализация: дерматоскопия",
    photo: null,
  },
];

const appointmentSteps = [
  { step: "Запись онлайн или по телефону", time: "1 мин" },
  { step: "Осмотр и дерматоскопия", time: "20–30 мин" },
  { step: "Обсуждение тактики и рекомендации", time: "10 мин" },
  { step: "План наблюдения или направление", time: "5 мин" },
];

const reviews = [
  {
    text: "Очень удобный сервис — сделала фото, получила оценку и сразу записалась к врачу. Всё прозрачно и понятно.",
    author: "Анна К.",
    source: "Проверено",
  },
  {
    text: "Врач подтвердил результат системы. Спокоен, что родинку нужно просто наблюдать. Рекомендую.",
    author: "Дмитрий В.",
    source: "Проверено",
  },
];

export default function DoctorsTrust() {
  return (
    <section id="doctors" className="section-padding" aria-labelledby="doctors-title">
      <div className="container mx-auto">
        {/* Doctors */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="doctors-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
            Наши врачи
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Опытные дерматологи подтверждают результаты и назначают тактику
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {doctors.map((d) => (
            <div key={d.name} className="bg-card rounded-2xl p-6 shadow-card flex flex-col">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 text-2xl font-display font-800 text-muted-foreground">
                {d.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </div>
              <h3 className="font-display text-lg font-700 text-foreground">{d.name}</h3>
              <p className="text-sm text-secondary font-medium mt-1">{d.role}</p>
              <p className="text-sm text-muted-foreground mt-2">{d.experience} · {d.certs}</p>
              <a href="#" className="mt-auto pt-4 text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                Подробнее <ChevronRight size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* How appointment works */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="font-display text-2xl font-700 text-foreground text-center mb-8">
            Как проходит приём
          </h3>
          <div className="space-y-4">
            {appointmentSteps.map((s, i) => (
              <div key={s.step} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-soft">
                <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-700 text-accent-foreground shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-foreground">{s.step}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={14} /> {s.time}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Стоимость консультации — <span className="font-medium">[уточняйте при записи]</span>
          </p>
        </div>

        {/* Reviews */}
        <div className="max-w-3xl mx-auto mb-8">
          <h3 className="font-display text-2xl font-700 text-foreground text-center mb-8">Отзывы пациентов</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div key={r.author} className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">«{r.text}»</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{r.author}</span>
                  <span className="text-xs text-muted-foreground">{r.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Licenses placeholder */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Лицензии и сертификаты клиники —{" "}
            <a href="#" className="text-primary underline">посмотреть документы</a>
          </p>
        </div>
      </div>
    </section>
  );
}
