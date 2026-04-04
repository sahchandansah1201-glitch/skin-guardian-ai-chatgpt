import { Lock, Eye, Shield, FileText } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const items = [
  {
    icon: Eye,
    title: "Что мы собираем",
    desc: "Минимум данных: контактная информация для связи и фото новообразования для анализа. Ничего лишнего.",
  },
  {
    icon: Shield,
    title: "Как защищаем",
    desc: "Шифрование данных при передаче и хранении. Доступ по ролям — только уполномоченные специалисты. Срок хранения — [указать].",
  },
  {
    icon: Lock,
    title: "Зачем каждое поле",
    desc: "Имя — чтобы обращаться к вам. Контакт — для записи и результатов. Фото — для оценки. Ничего не передаётся третьим лицам без согласия.",
  },
];

export default function PrivacySection() {
  return (
    <section id="privacy" className="section-padding bg-card" aria-labelledby="privacy-title">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 id="privacy-title" className="font-display text-3xl md:text-4xl font-800 text-foreground">
              Приватность и данные
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">Ваши данные — под вашим контролем</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-8" stagger={0.12}>
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-display text-lg font-700 text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="flex items-center gap-1 text-primary hover:underline">
              <FileText size={14} /> Политика конфиденциальности
            </a>
            <a href="#" className="flex items-center gap-1 text-primary hover:underline">
              <FileText size={14} /> Согласие на обработку данных
            </a>
            <a href="#" className="flex items-center gap-1 text-primary hover:underline">
              <FileText size={14} /> Условия использования
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
