import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#how-it-works", label: "Как работает" },
  { href: "#safety", label: "Безопасность" },
  { href: "#doctors", label: "Врачи" },
  { href: "#faq", label: "FAQ" },
];

const trackEvent = (name: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name);
  }
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-soft">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <a href="#" className="font-display text-xl font-800 text-primary tracking-tight" aria-label="SkinDoctor — на главную">
          Skin<span className="text-secondary">Doctor</span>
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Главное меню">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="#lead" onClick={() => trackEvent("click_lead_secondary")}>Чек‑лист</a>
          </Button>
          <Button size="sm" asChild>
            <a href="#booking" onClick={() => trackEvent("click_book_primary")}>Записаться</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-foreground/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 md:hidden glass border-t border-border px-4 pb-4">
            <nav className="flex flex-col gap-3 pt-3" aria-label="Мобильное меню">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-foreground/80 py-2">
                  {l.label}
                </a>
              ))}
              <Button size="sm" className="mt-2" asChild>
                <a href="#booking" onClick={() => { trackEvent("click_book_primary"); setOpen(false); }}>Записаться на приём</a>
              </Button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
