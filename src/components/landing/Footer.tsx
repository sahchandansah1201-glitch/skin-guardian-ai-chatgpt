export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-4 md:px-8 pb-24 md:pb-12">
      <div className="container mx-auto max-w-5xl">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <span className="font-display text-lg font-800">Skin<span className="text-secondary">Doctor</span></span>
            <p className="text-sm text-primary-foreground/60 mt-3 leading-relaxed">
              Интеллектуальная система оценки риска новообразований кожи с поддержкой врача.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-700 mb-3">Навигация</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/60">
              <a href="#how-it-works" className="hover:text-primary-foreground transition-colors">Как работает</a>
              <a href="#doctors" className="hover:text-primary-foreground transition-colors">Врачи</a>
              <a href="#faq" className="hover:text-primary-foreground transition-colors">FAQ</a>
              <a href="#booking" className="hover:text-primary-foreground transition-colors">Записаться</a>
            </nav>
          </div>

          <div>
            <h4 className="font-display text-sm font-700 mb-3">Документы</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Условия использования</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Лицензии клиники</a>
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-xs text-primary-foreground/40 text-center">
          <p>© {new Date().getFullYear()} SkinDoctor. Не является медицинским устройством. Не заменяет консультацию врача.</p>
        </div>
      </div>
    </footer>
  );
}
