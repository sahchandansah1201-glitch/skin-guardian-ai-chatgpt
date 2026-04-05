import { Button } from "@/components/ui/button";
import { Camera, Sun, Ruler, Focus, ArrowRight } from "lucide-react";

const tips = [
  {
    icon: Sun,
    title: "Хорошее освещение",
    desc: "Снимайте при дневном свете, без вспышки",
  },
  {
    icon: Focus,
    title: "Фокус на родинке",
    desc: "Расстояние 10–15 см, родинка в центре кадра",
  },
  {
    icon: Ruler,
    title: "Масштаб",
    desc: "Положите линейку или монету рядом для масштаба",
  },
  {
    icon: Camera,
    title: "Качество фото",
    desc: "Фото должно быть резким, без размытия",
  },
];

export default function StepInstructions({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-5 mt-2">
      <p className="text-sm text-muted-foreground">
        Чтобы AI дал точный результат, сделайте фото по этим рекомендациям:
      </p>

      <div className="grid gap-3">
        {tips.map((tip) => (
          <div key={tip.title} className="flex gap-3 items-start p-3 rounded-xl bg-muted/50 border border-border">
            <div className="shrink-0 w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
              <tip.icon size={18} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{tip.title}</p>
              <p className="text-xs text-muted-foreground">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Button size="lg" className="w-full rounded-xl" onClick={onNext}>
        Понятно, загрузить фото <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
}
