import React from 'react';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';
import { curiositiesData as allCuriositiesData } from './translations';

interface CuriositiesProps {
    onGoHome: () => void;
}

const Curiosities: React.FC<CuriositiesProps> = ({ onGoHome }) => {
    const { language, t } = useLanguage();
    const currentCuriosities = allCuriositiesData[language];

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen py-16 animate-fade-in">
            <div className="w-full max-w-3xl pb-16">
                <h1 className="text-4xl md:text-5xl font-black text-center text-white mb-4" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                    {t('curiositiesTitle')}
                </h1>
                <p className="text-center text-[#A385E8] text-lg font-bold tracking-wider mb-10">
                    {t('curiositiesSubtitle')}
                </p>

                <div className="space-y-6">
                    {currentCuriosities.map((item, index) => (
                        <div 
                            key={index} 
                            className="p-6 bg-[#1a1a3d] rounded-2xl shadow-xl border border-[#A385E8]/20 transition-transform duration-300 hover:scale-[1.02] hover:border-[#A385E8]/50"
                            style={{ animation: `fade-in-up 0.5s ${index * 0.15}s ease-out forwards`, opacity: 0 }}
                        >
                            <div className="flex items-center mb-3">
                                {item.icon}
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={onGoHome}
                        className="px-8 py-3 font-bold text-lg text-white border-2 border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_25px_#A385E8] transform hover:scale-105">
                        {t('buttonGoHome')}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Curiosities;
