import { useLanguage } from '../lib/i18n/LanguageContext';
import { cn } from '../lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ className, isScrolled = false }: LanguageSwitcherProps) {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ja' : 'en');
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        "rounded-full p-2",
        isScrolled
          ? "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          : "text-white/80 hover:bg-white/10",
        className
      )}
      aria-label="Toggle language"
    >
      <span className="w-5 h-5 flex items-center justify-center font-bold">
        {language === 'en' ? 'JA' : 'EN'}
      </span>
    </button>
  );
}