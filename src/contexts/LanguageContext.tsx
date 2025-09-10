"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/data/translations';

type Language = 'tr' | 'en';
type TranslationsKeys = keyof typeof translations.tr;

// ARAYÜZ (INTERFACE) TANIMLAMASI
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationsKeys) => string;
}

// SORUNUN KAYNAĞI BURADAYDI:
// createContext'e bir varsayılan değer vermek zorundayız.
// Bu değer, Provider olmadan Context'i çağırmaya çalışan
// bir bileşen olduğunda devreye girer. Biz bunu bir hata olarak
// ele alacağız, bu yüzden başlangıç değerleri sahte olabilir.
export const LanguageContext = createContext<LanguageContextType>({
    language: 'tr',
    setLanguage: () => console.warn('no language provider'),
    t: (key: TranslationsKeys) => key,
});

// GERİSİ AYNI AMA KONTROL AMAÇLI KOYUYORUM
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('tr');

    useEffect(() => {
        const storedLang = localStorage.getItem('lumi-lang') as Language | null;
        if (storedLang) {
          setLanguageState(storedLang);
          document.documentElement.lang = storedLang;
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('lumi-lang', lang);
        document.documentElement.lang = lang;
    };

    const t = (key: TranslationsKeys): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};