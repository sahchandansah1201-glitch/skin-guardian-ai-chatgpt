import { Button } from "@/components/ui/button";
import { useSkinCheck } from "@/components/skin-check/SkinCheckContext";

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

export default function StickyMobileCTA() {
  const { open } = useSkinCheck();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border p-3 flex gap-2">
      <Button size="sm" className="flex-1 rounded-xl text-sm" onClick={() => { trackEvent("click_book_primary"); open(); }}>
        Проверить родинку
      </Button>
      <Button size="sm" variant="outline" className="flex-1 rounded-xl text-sm" asChild>
        <a href="#lead" onClick={() => trackEvent("click_lead_secondary")}>Чек‑лист</a>
      </Button>
    </div>
  );
}
