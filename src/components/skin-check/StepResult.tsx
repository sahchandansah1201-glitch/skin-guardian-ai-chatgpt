import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  HelpCircle,
  RefreshCw,
  MessageCircle,
  Clock,
  Stethoscope,
  FileText,
  ChevronRight,
  Mail,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult } from "./SkinCheckModal";

const riskConfig = {
  low: {
    color: "text-emerald-700",
    bg: "bg-gradient-to-br from-emerald-50 to-green-50",
    border: "border-emerald-200",
    badgeBg: "bg-emerald-100",
    barColor: "bg-emerald-500",
    glow: "shadow-emerald-100",
    icon: ShieldCheck,
    label: "Низкий риск",
    hint: "Признаков опасности не обнаружено",
  },
  medium: {
    color: "text-amber-700",
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
    border: "border-amber-200",
    badgeBg: "bg-amber-100",
    barColor: "bg-amber-500",
    glow: "shadow-amber-100",
    icon: AlertTriangle,
    label: "Средний риск",
    hint: "Рекомендуется консультация дерматолога",
  },
  high: {
    color: "text-red-700",
    bg: "bg-gradient-to-br from-red-50 to-rose-50",
    border: "border-red-200",
    badgeBg: "bg-red-100",
    barColor: "bg-red-500",
    glow: "shadow-red-100",
    icon: XCircle,
    label: "Высокий риск",
    hint: "Необходима срочная консультация врача",
  },
  unknown: {
    color: "text-slate-600",
    bg: "bg-gradient-to-br from-slate-50 to-gray-50",
    border: "border-slate-200",
    badgeBg: "bg-slate-100",
    barColor: "bg-slate-400",
    glow: "shadow-slate-100",
    icon: HelpCircle,
    label: "Не определено",
    hint: "Попробуйте загрузить более качественное фото",
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
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
  const config = riskConfig[result.risk_level as keyof typeof riskConfig] || riskConfig.unknown;
  const Icon = config.icon;
  const { toast } = useToast();

  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendEmail = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Введите корректный email", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "skin-check-result",
          recipientEmail: email,
          idempotencyKey: `skin-result-${Date.now()}`,
          templateData: {
            risk_label: result.risk_label,
            risk_level: result.risk_level,
            object_class: result.object_class,
            confidence_percent: result.confidence_percent,
            description: result.description,
            recommendation: result.recommendation,
            next_check: result.next_check,
          },
        },
      });
      if (error) throw error;
      setSent(true);
      toast({ title: "Результат отправлен на " + email });
    } catch (e: any) {
      console.error("Email send error:", e);
      toast({
        title: "Не удалось отправить",
        description: "Email-домен ещё не настроен. Обратитесь к администратору.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="space-y-4 mt-1"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Risk Hero Card */}
      <motion.div
        variants={item}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`relative overflow-hidden rounded-2xl border ${config.border} ${config.bg} p-5 shadow-sm ${config.glow}`}
      >
        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
            className={`flex-shrink-0 w-14 h-14 rounded-xl ${config.badgeBg} flex items-center justify-center`}
          >
            <Icon size={28} className={config.color} strokeWidth={2.2} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className={`text-lg font-bold ${config.color} leading-tight`}>
              {result.risk_label}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {config.hint}
            </p>
            {result.object_class && result.object_class !== "Не удалось определить" && (
              <span
                className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.badgeBg} ${config.color}`}
              >
                {result.object_class}
              </span>
            )}
          </div>
        </div>

        {result.confidence_percent > 0 && (
          <div className="mt-4 pt-3 border-t border-current/5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground font-medium">
                Уверенность анализа
              </span>
              <span className={`text-sm font-bold ${config.color}`}>
                {result.confidence_percent}%
              </span>
            </div>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${config.barColor} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence_percent}%` }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Description */}
      <motion.div
        variants={item}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="flex gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/60"
      >
        <FileText size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Описание
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            {result.description}
          </p>
        </div>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        variants={item}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`flex gap-3 p-3.5 rounded-xl border ${
          result.risk_level === "high"
            ? "bg-red-50/50 border-red-200/60"
            : result.risk_level === "medium"
            ? "bg-amber-50/50 border-amber-200/60"
            : "bg-muted/40 border-border/60"
        }`}
      >
        <Stethoscope
          size={18}
          className={`flex-shrink-0 mt-0.5 ${
            result.risk_level === "high"
              ? "text-red-500"
              : result.risk_level === "medium"
              ? "text-amber-500"
              : "text-muted-foreground"
          }`}
        />
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Рекомендация
          </p>
          <p className="text-sm text-foreground leading-relaxed font-medium">
            {result.recommendation}
          </p>
        </div>
      </motion.div>

      {/* Next check */}
      {result.next_check && result.next_check !== "—" && (
        <motion.div
          variants={item}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40"
        >
          <Clock size={16} className="text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Следующая проверка:{" "}
            <span className="font-medium text-foreground">{result.next_check}</span>
          </p>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div
        variants={item}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/40"
      >
        <p className="text-xs text-amber-800/80 leading-relaxed">
          <span className="font-semibold">⚠️ Важно:</span> Это предварительная AI-оценка, а не
          медицинский диагноз. При любых сомнениях обратитесь к дерматологу. Обязательно
          покажите врачу, если заметили изменения формы, цвета или размера.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={item}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="flex flex-col gap-2 pt-1"
      >
        <Button size="lg" className="w-full rounded-xl group" asChild>
          <a href="https://t.me/Skin_Doctor_bot" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} className="mr-2" />
            Консультация в Telegram
            <ChevronRight
              size={14}
              className="ml-auto opacity-60 group-hover:translate-x-0.5 transition-transform"
            />
          </a>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="flex-1 rounded-xl" onClick={onRetry}>
            <RefreshCw size={16} className="mr-2" />
            Новое фото
          </Button>
          <Button variant="ghost" size="lg" className="flex-1 rounded-xl" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
