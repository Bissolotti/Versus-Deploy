import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, TranslationKey } from './translations';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('pt');

    const t = (key: TranslationKey, vars: Record<string, string | number> = {}): string => {
        let text = translations[key]?.[language] || key;
        Object.keys(vars).forEach(varKey => {
            const regex = new RegExp(`{${varKey}}`, 'g');
            text = text.replace(regex, String(vars[varKey]));
        });
        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};