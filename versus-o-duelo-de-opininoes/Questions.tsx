import React, { useState, useEffect, useRef } from 'react';

const questions = [
    { 
        id: 1, 
        text: 'Trump vai atacar a Venezuela?',
        explanation: 'A relação entre os EUA, sob uma possível nova administração Trump, e a Venezuela de Nicolás Maduro é um tópico de intensa especulação. Durante seu mandato, Trump adotou uma política de "pressão máxima", com sanções econômicas severas e não descartou publicamente a "opção militar". Embora uma intervenção militar direta seja considerada de alto risco e custo, analistas debatem se uma nova presidência adotaria uma postura ainda mais agressiva ou se concentraria em outras prioridades de política externa.'
    },
    { 
        id: 2, 
        text: 'Bolsonaro é elegível para 2026?',
        explanation: 'O ex-presidente Jair Bolsonaro foi declarado inelegível por 8 anos pelo Tribunal Superior Eleitoral (TSE) em junho de 2023. A condenação, por abuso de poder político e uso indevido dos meios de comunicação, o impede de concorrer nas eleições de 2026 e 2030. A defesa de Bolsonaro está recorrendo da decisão em instâncias superiores, como o Supremo Tribunal Federal (STF), mas até que uma eventual reversão ocorra, ele permanece inelegível.'
    },
    { 
        id: 3, 
        text: 'Barroso deve sofrer sanções Magnitski?',
        explanation: 'A Lei Magnitsky é uma legislação dos EUA que permite ao governo americano impor sanções a indivíduos estrangeiros por violações de direitos humanos ou atos significativos de corrupção. O debate sobre sua aplicação ao Ministro Luís Roberto Barroso, do STF, surge a partir de alegações de ativismo judicial e de suspeitas sobre a condução do processo eleitoral de 2022. A aplicação da lei é uma prerrogativa do poder executivo dos EUA e, historicamente, baseia-se em investigações que apontem evidências de violações graves, levando em conta tanto os critérios da legislação quanto as implicações diplomáticas.'
    },
];

// --- SIMULAÇÃO DE UM BACKEND / BANCO DE DADOS ---
// Esta estrutura de dados fica fora do componente React,
// então ela não é recriada a cada renderização.
// Ela persistirá enquanto a página não for recarregada.
// Isso simula como um servidor manteria os dados.
const voteDatabase = questions.reduce((acc, q) => {
    acc[q.id] = { 
        yes: Math.floor(Math.random() * 100) + 1, // Começa com dados aleatórios
        no: Math.floor(Math.random() * 100) + 1,
        votedByThisUser: false // Controla se o usuário já votou nesta pergunta
    };
    return acc;
}, {} as Record<number, { yes: number, no: number, votedByThisUser: boolean }>);
// --- FIM DA SIMULAÇÃO ---


interface QuestionsProps {
    onGoHome: () => void;
}

const Questions: React.FC<QuestionsProps> = ({ onGoHome }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // O 'votes' agora é apenas uma "cópia" visual do nosso banco de dados simulado.
    // Usamos um truque com um contador para forçar a atualização da tela.
    const [_, forceUpdate] = React.useState(0);
    
    const [viewMode, setViewMode] = useState<'voting' | 'explanation'>('voting');

    const currentQuestion = questions[currentQuestionIndex];
    // Sempre lê os dados mais recentes do nosso "banco de dados"
    const currentVotesData = voteDatabase[currentQuestion.id];
    
    const totalVotes = currentVotesData.yes + currentVotesData.no;
    const yesPercentage = totalVotes > 0 ? ((currentVotesData.yes / totalVotes) * 100).toFixed(0) : 50;
    const noPercentage = totalVotes > 0 ? ((currentVotesData.no / totalVotes) * 100).toFixed(0) : 50;
    
    // Verifica se o usuário já votou nesta pergunta específica
    const hasVotedOnCurrent = currentVotesData.votedByThisUser;

    const handleVote = (option: 'yes' | 'no') => {
        if (hasVotedOnCurrent) return;

        // Atualiza nosso "banco de dados" diretamente
        voteDatabase[currentQuestion.id][option]++;
        voteDatabase[currentQuestion.id].votedByThisUser = true;

        // Força o componente a renderizar novamente para mostrar os novos dados
        forceUpdate(c => c + 1);
    };

    const handleNextQuestion = () => {
        setViewMode('voting');
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
        // Não precisamos mais resetar o status de votação aqui,
        // pois ele é lido diretamente do nosso "banco de dados" simulado.
    };

    if (viewMode === 'explanation') {
        return (
             <div className="relative flex flex-col items-center justify-center w-full h-full p-4 animate-fade-in">
                <button
                    onClick={onGoHome}
                    className="absolute top-6 left-6 px-4 py-2 font-bold text-sm text-[#A385E8] border border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_15px_#A385E8] z-20"
                    aria-label="Voltar para a página inicial">
                    &larr; Voltar para Home
                </button>
                <div className="w-full max-w-2xl p-8 bg-[#1a1a3d] rounded-2xl shadow-2xl border border-[#A385E8]/20 animate-fade-in">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 tracking-wide">
                        {currentQuestion.text}
                    </h2>
                    <p className="text-base md:text-lg text-gray-300 text-left leading-relaxed">
                        {currentQuestion.explanation}
                    </p>
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setViewMode('voting')}
                            className="px-8 py-3 font-bold text-lg text-white border-2 border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_25px_#A385E8] transform hover:scale-105">
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full p-4 animate-fade-in">
            <button
                onClick={onGoHome}
                className="absolute top-6 left-6 px-4 py-2 font-bold text-sm text-[#A385E8] border border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_15px_#A385E8] z-20"
                aria-label="Voltar para a página inicial">
                &larr; Voltar para Home
            </button>
            <div className="w-full max-w-2xl p-8 bg-[#1a1a3d] rounded-2xl shadow-2xl border border-[#A385E8]/20">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 tracking-wide">
                    {currentQuestion.text}
                </h2>

                <div className="flex justify-between items-center space-x-4 mb-4">
                    <button
                        onClick={() => handleVote('no')}
                        disabled={hasVotedOnCurrent}
                        className="w-full px-6 py-3 font-bold text-xl text-white bg-[#E83D84] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 hover:shadow-[0_0_20px_#E83D84]">
                        NÃO
                    </button>
                    <button
                        onClick={() => handleVote('yes')}
                        disabled={hasVotedOnCurrent}
                        className="w-full px-6 py-3 font-bold text-xl text-white bg-[#3DE8E8] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 hover:shadow-[0_0_20px_#3DE8E8]">
                        SIM
                    </button>
                </div>

                {/* Seção de Resultados - Agora é sempre visível, mas a barra só aparece após o voto */}
                <div className="mt-8">
                    <div className={`relative w-full h-10 bg-[#0C0C2D] rounded-full overflow-hidden flex border-2 border-[#A385E8]/50 transition-opacity duration-500 ${hasVotedOnCurrent ? 'opacity-100' : 'opacity-0'}`}>
                        <div
                            className="h-full bg-[#E83D84] flex items-center justify-start pl-4 text-white font-bold transition-all duration-700 ease-out"
                            style={{ width: `${noPercentage}%` }}>
                            {noPercentage}%
                        </div>
                        <div
                            className="h-full bg-[#3DE8E8] flex items-center justify-end pr-4 text-[#0C0C2D] font-bold transition-all duration-700 ease-out"
                            style={{ width: `${yesPercentage}%` }}>
                            {yesPercentage}%
                        </div>
                    </div>
                </div>
                
                {/* Botão de Próxima Pergunta */}
                {hasVotedOnCurrent && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleNextQuestion}
                            className="px-8 py-3 font-bold text-lg text-white border-2 border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_25px_#A385E8] transform hover:scale-105 animate-fade-in">
                            Próxima Pergunta
                        </button>
                    </div>
                )}
            </div>
            
            {/* Botão de Contexto */}
            <button
                onClick={() => setViewMode('explanation')}
                className="mt-6 px-5 py-2 font-bold text-sm text-[#A385E8] border border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8]/20 transform hover:scale-105"
                aria-label="Entenda o contexto da pergunta">
                Entenda
            </button>
        </div>
    );
};

export default Questions;