import React from 'react';
import { useLanguage } from './LanguageContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();
    return (
        <footer className="absolute bottom-4 w-full text-center text-sm text-gray-500 animate-fade-in z-20">
            {t('developedBy')}{' '}
            <a
                href="#" // TODO: Adicione o link do seu portfólio, GitHub ou LinkedIn aqui
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-400 hover:text-white transition-colors duration-300"
            >
                Biss Produções
            </a>
        </footer>
    );
};

export default Footer;