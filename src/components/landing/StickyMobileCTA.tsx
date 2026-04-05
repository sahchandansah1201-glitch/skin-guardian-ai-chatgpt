import { Button } from "@/components/ui/button";

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border p-3 flex gap-2">
      <Button size="sm" className="flex-1 rounded-xl text-sm" asChild>
        <a href="https://t.me/Skin_Doctor_bot" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("click_book_primary")}>Проверить родинку</a>
      </Button>
      <Button size="sm" variant="outline" className="flex-1 rounded-xl text-sm" asChild>
        <a href="#lead" onClick={() => trackEvent("click_lead_secondary")}>Чек‑лист</a>
      </Button>
    </div>
  );
}
