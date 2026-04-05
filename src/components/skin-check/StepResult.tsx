import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertTriangle, XCircle, HelpCircle, RefreshCw, MessageCircle } from "lucide-react";
import type { AnalysisResult } from "./SkinCheckModal";

const riskConfig: Record<string, { color: string; bg: string; icon: typeof ShieldCheck }> = {
  low: { color: "text-green-600", bg: "bg-green-50 border-green-200", icon: ShieldCheck },
  medium: { color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: AlertTriangle },
  high: { color: "text-red-600", bg: "bg-red-50 border-red-200", icon: XCircle },
  unknown: { color: "text-muted-foreground", bg: "bg-muted border-border", icon: HelpCircle },
};

export default function StepResult({
  result,
  onClose,
  onRetry,
}: {
  result: AnalysisResult;
  onClose: () => void;
  onRetry: () => void;
}) {
  const config = riskConfig[result.risk_level] || riskConfig.unknown;
  const Icon = config.icon;

  return (
    <div className="space-y-5 mt-2">
      {/* Risk badge */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${config.bg}`}>
        <Icon size={28} className={config.color} />
        <div>
          <p className={`text-lg font-bold ${config.color}`}>
            Уровень угрозы: {result.risk_label}
          </p>
          <p className="text-sm text-muted-foreground">
            Класс объекта: {result.object_class}
          </p>
        </div>
      </div>

      {/* Confidence */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Сходство признаков:</span>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-700"
            style={{ width: `${result.confidence_percent}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground">{result.confidence_percent}%</span>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-sm text-foreground">{result.description}</p>
        <p className="text-sm text-foreground font-medium">📋 {result.recommendation}</p>
        <p className="text-sm text-muted-foreground">
          🔄 Следующая плановая проверка: {result.next_check}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="p-3 rounded-xl bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground">
          ⚠️ Это предварительная оценка AI, а не диагноз. При любых сомнениях обратитесь к дерматологу. Сразу же отправляй фото, если заметил любые изменения, или была травма.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button size="lg" className="w-full rounded-xl" asChild>
          <a href="https://t.me/Skin_Doctor_bot" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} className="mr-2" />
            Написать @Skin_Doctor_bot
          </a>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="flex-1 rounded-xl" onClick={onRetry}>
            <RefreshCw size={16} className="mr-2" />
            Новый анализ
          </Button>
          <Button variant="outline" size="lg" className="flex-1 rounded-xl" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
}
