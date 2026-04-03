import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Это диагноз?",
    a: "Нет. SkinDoctor не ставит диагнозов. Система выполняет оценку риска (триаж) и помогает определить, нужна ли вам консультация дерматолога. Окончательное решение всегда принимает врач.",
  },
  {
    q: "Насколько это точно?",
    a: "Модель обучена на ~16 000 клинических изображений и показывает высокую чувствительность к потенциально опасным образованиям. Однако ни одна система не даёт 100% точности. При сомнениях мы рекомендуем очный осмотр.",
  },
  {
    q: "Что если фото получится плохим?",
    a: "Система оценивает качество фото. Если изображение недостаточно чёткое или плохо освещено, вам будет предложено переснять. Мы даём пошаговую инструкцию для правильной съёмки.",
  },
  {
    q: "Кто видит мои данные?",
    a: "Доступ к данным имеют только уполномоченные медицинские специалисты. Фото и контактная информация защищены шифрованием и не передаются третьим лицам без вашего согласия.",
  },
  {
    q: "Подходит ли для любого оттенка кожи?",
    a: "Мы постоянно улучшаем и расширяем обучающую выборку для разных фототипов кожи. Если есть сомнения в результате — рекомендуем консультацию дерматолога для очной оценки.",
  },
  {
    q: "Сколько стоит консультация дерматолога?",
    a: "Стоимость зависит от объёма осмотра и дополнительных процедур (дерматоскопия, биопсия). Точную цену вы узнаете при записи или по телефону клиники.",
  },
  {
    q: "Как быстро я получу результат?",
    a: "Оценка риска по фото занимает несколько минут. Вы получите результат с рекомендацией: наблюдать, повторить проверку или записаться к врачу.",
  },
  {
    q: "Могу ли я использовать SkinDoctor для ребёнка?",
    a: "Да, но для детей мы особенно рекомендуем очную консультацию дерматолога независимо от результата оценки.",
  },
  {
    q: "Нужно ли скачивать приложение?",
    a: "Нет. SkinDoctor работает через веб‑интерфейс — достаточно камеры смартфона и браузера.",
  },
  {
    q: "Как часто нужно проверяться?",
    a: "Рекомендуем самопроверку раз в 3–6 месяцев, а также при появлении любых новых или изменяющихся образований на коже.",
  },
];

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding" aria-labelledby="faq-title">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 id="faq-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
            Частые вопросы
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Ответы на главные вопросы о SkinDoctor
          </p>
        </div>

        <Accordion type="multiple" className="space-y-3" onValueChange={() => trackEvent("open_faq")}>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-xl border border-border px-6 shadow-soft"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
