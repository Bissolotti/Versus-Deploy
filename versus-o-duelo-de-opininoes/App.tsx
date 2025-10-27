import React, { useState, useEffect } from 'react';
import Questions from './Questions'; // Importa o novo componente

const App: React.FC = () => {
    const [animationStage, setAnimationStage] = useState(0);
    const [page, setPage] = useState('intro'); // 'intro' ou 'questions'

    useEffect(() => {
        // Apenas executa os timers da animação na página de introdução
        if (page !== 'intro') return;

        const timers = [
            setTimeout(() => setAnimationStage(1), 500),   // Inicia as partículas
            setTimeout(() => setAnimationStage(2), 2000),  // Flash de colisão
            setTimeout(() => setAnimationStage(3), 2100),  // Esconde partículas, mostra texto
            setTimeout(() => setAnimationStage(4), 3100),  // Mostra subtítulo
            setTimeout(() => setAnimationStage(5), 4100),  // Mostra botão
        ];

        // Limpa os timers ao desmontar o componente
        return () => {
            timers.forEach(clearTimeout);
        };
    }, [page]); // Re-executa o efeito se a página mudar

    const handleEnter = () => {
        setPage('questions');
    };

    const handleGoHome = () => {
        setPage('intro');
        setAnimationStage(0); // Reinicia a animação
    };

    if (page === 'intro') {
        return (
            <main className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-[#0C0C2D] text-white">
                
                {/* Container de animação para elementos centralizados */}
                <div className="absolute inset-0 flex items-center justify-center">
                    
                    {/* Partículas */}
                    {animationStage >= 1 && animationStage < 3 && (
                        <>
                            {/* Partícula Esquerda (Rosa) */}
                            <div className="absolute w-40 h-40 rounded-full blur-2xl opacity-80 bg-radial-pink animate-move-left" />
                            {/* Partícula Direita (Ciano) */}
                            <div className="absolute w-40 h-40 rounded-full blur-2xl opacity-80 bg-radial-cyan animate-move-right" />
                        </>
                    )}
                    
                    {/* Flash de Colisão */}
                    {animationStage === 2 && (
                        <div className="absolute w-24 h-24 bg-white rounded-full blur-lg animate-flash-effect" />
                    )}
                </div>
                
                <div className="z-10 flex flex-col items-center justify-center text-center">
                    {/* Título */}
                    {animationStage >= 3 && (
                         <>
                            <p className="text-xl md:text-2xl font-bold tracking-[0.5em] uppercase text-[#E83D84] opacity-0 animate-fade-in mb-2" style={{ textShadow: '0 0 10px rgba(232, 61, 132, 0.7)' }}>
                                OPINE
                            </p>
                            <h1 className="text-8xl md:text-9xl font-black tracking-[0.1em] uppercase bg-gradient-to-r from-[#3DE8E8] via-white to-[#E83D84] text-transparent bg-clip-text animate-title-in"
                                 style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
                                VERSUS
                            </h1>
                        </>
                    )}

                    {/* Subtítulo */}
                    {animationStage >= 4 && (
                        <p className="mt-4 text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-[#A385E8] opacity-0 animate-fade-in">
                            O Duelo de Opiniões
                        </p>
                    )}
                    
                    {/* Botão */}
                    {animationStage >= 5 && (
                        <button 
                            onClick={handleEnter}
                            className="mt-12 px-8 py-3 font-bold text-lg text-white border-2 border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out opacity-0 animate-fade-in hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_25px_#A385E8] transform hover:scale-105">
                            ENTRAR
                        </button>
                    )}
                </div>
            </main>
        );
    }
    
    // Renderiza a página de Perguntas
    return (
        <main className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-[#0C0C2D] text-white">
            <Questions onGoHome={handleGoHome} />
        </main>
    );
};

export default App;