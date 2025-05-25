"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Language } from "../i18n";

interface HeaderProps {
  lang: Language;
  translations: {
    features: string;
    download: string;
    documentation: string;
    github: string;
  };
}

export default function Header({ lang, translations }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Check system preference for dark mode
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Render the language switcher client-side
  const renderLanguageSwitcher = () => {
    // Get the current URL
    const currentUrl = new URL(window.location.href);
    
    // Determine the target language
    const targetLang = lang === "en" ? "ja" : "en";
    
    // Create the target URL by replacing the language segment in the pathname
    const pathSegments = currentUrl.pathname.split('/').filter(Boolean);
    
    if (pathSegments[0] === "en" || pathSegments[0] === "ja") {
      pathSegments[0] = targetLang;
    } else {
      pathSegments.unshift(targetLang);
    }
    
    const targetUrl = `/${pathSegments.join('/')}${currentUrl.search}`;
    
    return (
      <a
        href={targetUrl}
        className={cn(
          "rounded-full p-2",
          isScrolled
            ? "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            : "text-white/80 hover:bg-white/10"
        )}
        aria-label={`Switch to ${targetLang === "en" ? "English" : "Japanese"}`}
      >
        <span className="w-5 h-5 flex items-center justify-center font-bold">
          {targetLang === "en" ? "EN" : "JA"}
        </span>
      </a>
    );
  };

  const navLinks = [
    { name: translations.features, href: "#features" },
    { name: translations.download, href: "#download" },
    { name: translations.documentation, href: "#docs" },
    {
      name: translations.github,
      href: "https://github.com/shm11C3/HardwareVisualizer",
      external: true,
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 shadow-sm backdrop-blur-sm dark:bg-slate-900/90"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a href={`/${lang}`} className="flex items-center gap-2">
            <img src="/app-icon.png" alt="Logo" className="h-8 w-8" />
            <span
              className={cn(
                "font-bold text-xl",
                isScrolled ? "text-slate-900 dark:text-white" : "text-white",
              )}
            >
              HardwareVisualizer
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "font-medium transition-colors hover:text-cyan-500",
                  isScrolled
                    ? "text-slate-600 dark:text-slate-300"
                    : "text-white/80",
                )}
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleDarkMode}
              className={cn(
                "rounded-full p-2",
                isScrolled
                  ? "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  : "text-white/80 hover:bg-white/10",
              )}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {renderLanguageSwitcher()}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleDarkMode}
              className={cn(
                "rounded-full p-2",
                isScrolled
                  ? "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  : "text-white/80 hover:bg-white/10",
              )}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {renderLanguageSwitcher()}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "rounded-full p-2",
                isScrolled
                  ? "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  : "text-white/80 hover:bg-white/10",
              )}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-slate-200 border-t bg-white md:hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="py-2 font-medium text-slate-600 hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
