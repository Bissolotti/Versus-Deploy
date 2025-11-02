import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import Curiosities from './Curiosities';
import Footer from './Footer';
import { useLanguage } from './LanguageContext';

const App: React.FC = () => {
    const [animationStage, setAnimationStage] = useState(0);
    const [page, setPage] = useState<'intro' | 'questions' | 'curiosities'>('intro');
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        if (page !== 'intro') return;

        const timers = [
            setTimeout(() => setAnimationStage(1), 500),
            setTimeout(() => setAnimationStage(2), 2000),
            setTimeout(() => setAnimationStage(3), 2100),
            setTimeout(() => setAnimationStage(4), 3100),
            setTimeout(() => setAnimationStage(5), 4100),
        ];

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [page]);

    const handleEnter = () => setPage('questions');
    const handleEnterCuriosities = () => setPage('curiosities');

    const handleGoHome = () => {
        setPage('intro');
        setAnimationStage(0);
    };

    if (page === 'intro') {
        return (
            <main className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-transparent text-white" style={{ perspective: '1000px' }}>
                
                <div className="absolute top-6 right-6 z-20 flex space-x-3">
                    <button 
                        onClick={() => setLanguage('pt')}
                        className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 ${language === 'pt' ? 'text-white bg-[#A385E8]' : 'text-gray-400 bg-black/20 hover:bg-white/20'}`}
                    >
                        PT
                    </button>
                    <button 
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 ${language === 'en' ? 'text-white bg-[#A385E8]' : 'text-gray-400 bg-black/20 hover:bg-white/20'}`}
                    >
                        EN
                    </button>
                    <button 
                        onClick={() => setLanguage('es')}
                        className={`px-3 py-1 text-sm font-bold rounded-md transition-all duration-300 ${language === 'es' ? 'text-white bg-[#A385E8]' : 'text-gray-400 bg-black/20 hover:bg-white/20'}`}
                    >
                        ES
                    </button>
                </div>

                {animationStage >= 3 && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                        <svg
                            className="w-64 h-64 opacity-0 animate-fade-in animate-hologram"
                            style={{ animationDelay: '0.3s', opacity: 0.15 }}
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g style={{ filter: 'drop-shadow(0 0 4px #E83D84)' }}>
                                <path d="M50 10 L15 30 L15 70 L50 90" stroke="#E83D84" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M50 50 L25 40 M25 60 L50 50" stroke="#E83D84" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <g style={{ filter: 'drop-shadow(0 0 4px #3DE8E8)' }}>
                                <path d="M50 10 L85 30 L85 70 L50 90" stroke="#3DE8E8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M50 50 L75 40 M75 60 L50 50" stroke="#3DE8E8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                        </svg>
                    </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                    {animationStage >= 1 && animationStage < 3 && (
                        <>
                            <div className="absolute w-40 h-40 rounded-full blur-2xl opacity-80 bg-radial-pink animate-move-left" />
                            <div className="absolute w-40 h-40 rounded-full blur-2xl opacity-80 bg-radial-cyan animate-move-right" />
                        </>
                    )}
                    {animationStage === 2 && (
                        <div className="absolute w-24 h-24 bg-white rounded-full blur-lg animate-flash-effect" />
                    )}
                </div>
                
                <div className="z-10 flex flex-col items-center justify-center text-center">
                    {animationStage >= 3 && (
                         <>
                            <p className="text-xl md:text-2xl font-bold tracking-[0.5em] uppercase text-[#E83D84] opacity-0 animate-fade-in mb-2" style={{ textShadow: '0 0 10px rgba(232, 61, 132, 0.7)' }}>
                                {t('introOpinion')}
                            </p>
                            <h1 className="text-8xl md:text-9xl font-black tracking-[0.1em] uppercase bg-gradient-to-r from-[#3DE8E8] via-white to-[#E83D84] text-transparent bg-clip-text animate-title-in"
                                 style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                                {t('introTitle')}
                            </h1>
                        </>
                    )}

                    {animationStage >= 4 && (
                        <p className="mt-4 text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-[#A385E8] opacity-0 animate-fade-in">
                            {t('introSubtitle')}
                        </p>
                    )}
                    
                    {animationStage >= 5 && (
                        <div className="flex items-center space-x-6 mt-12 opacity-0 animate-fade-in">
                            <button 
                                onClick={handleEnter}
                                className="px-8 py-3 font-bold text-lg text-white bg-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-[#0C0C2D] hover:shadow-[0_0_25px_#A385E8] transform hover:scale-105">
                                {t('introButtonOpine')}
                            </button>
                             <button 
                                onClick={handleEnterCuriosities}
                                className="px-8 py-3 font-bold text-lg text-white border-2 border-white/50 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transform hover:scale-105">
                                {t('introButtonCuriosities')}
                            </button>
                        </div>
                    )}
                </div>
                {animationStage >= 5 && <Footer />}
            </main>
        );
    }
    
    if (page === 'curiosities') {
        return (
            <main className="relative flex flex-col items-center w-screen min-h-screen overflow-y-auto bg-transparent text-white p-4">
                <Curiosities onGoHome={handleGoHome} />
            </main>
        );
    }

    return (
        <main className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-transparent text-white">
            <Questions onGoHome={handleGoHome} />
        </main>
    );
};

export default App;