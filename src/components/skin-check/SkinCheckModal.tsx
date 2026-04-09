import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useSkinCheck } from "./SkinCheckContext";
import StepContact from "./StepContact";
import StepInstructions from "./StepInstructions";
import StepUpload from "./StepUpload";
import StepProcessing from "./StepProcessing";
import StepResult from "./StepResult";

export type ContactData = {
  value: string;
  type: "email" | "phone" | "telegram";
};

export type AnalysisResult = {
  risk_level: string;
  risk_label: string;
  object_class: string;
  confidence_percent: number;
  description: string;
  recommendation: string;
  next_check: string;
};

type Step = "contact" | "instructions" | "upload" | "processing" | "result";

const stepTitles: Record<Step, string> = {
  contact: "Контактные данные",
  instructions: "Как сделать фото",
  upload: "Загрузите фото",
  processing: "Анализ...",
  result: "Результат анализа",
};

export default function SkinCheckModal() {
  const { isOpen, close } = useSkinCheck();
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState<ContactData | null>(null);
  const [checkId, setCheckId] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleClose = () => {
    close();
    // Reset after animation
    setTimeout(() => {
      setStep("contact");
      setContact(null);
      setCheckId(null);
      setResult(null);
    }, 300);
  };

  const handleContactSubmit = (data: ContactData) => {
    setContact(data);
    setStep("instructions");
  };

  const handleInstructionsDone = () => {
    setStep("upload");
  };

  const handleUploadDone = (id: string) => {
    setCheckId(id);
    setStep("processing");
  };

  const handleAnalysisDone = (res: AnalysisResult) => {
    setResult(res);
    setStep("result");
  };

  const totalSteps = 4;
  const currentStepNum =
    step === "contact" ? 1 :
    step === "instructions" ? 2 :
    step === "upload" ? 3 :
    step === "processing" ? 4 :
    4;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{stepTitles[step]}</DialogTitle>
          <DialogDescription>
            {step !== "result" && step !== "processing" && (
              <span className="text-xs text-muted-foreground">
                Шаг {currentStepNum} из {totalSteps}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        {step !== "result" && (
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: `${(currentStepNum / totalSteps) * 100}%` }}
            />
          </div>
        )}

        {step === "contact" && <StepContact onSubmit={handleContactSubmit} />}
        {step === "instructions" && <StepInstructions onNext={handleInstructionsDone} />}
        {step === "upload" && contact && (
          <StepUpload contact={contact} onUploaded={handleUploadDone} />
        )}
        {step === "processing" && checkId && (
          <StepProcessing checkId={checkId} onDone={handleAnalysisDone} />
        )}
        {step === "result" && result && (
          <StepResult result={result} onClose={handleClose} onRetry={() => setStep("upload")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
