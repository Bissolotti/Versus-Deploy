import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { questionsContent as allQuestionsContent } from './translations';

// ============================================================================
// ESTRUTURA DOS DADOS
// ============================================================================
interface Question {
    id: number;
    text: string;
    explanation: string;
    yes: number;
    no: number;
}

// ============================================================================
// SIMULAÇÃO DO BACKEND
// ============================================================================
const DB_VOTES_KEY = 'supabase_mock_votes';

const api = {
    fetchQuestions: async (lang: 'pt' | 'en' | 'es'): Promise<Question[]> => {
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        const storedVotes = JSON.parse(localStorage.getItem(DB_VOTES_KEY) || '{}');
        const content = allQuestionsContent[lang];
        
        const fullQuestions = content.map(q => ({
            ...q,
            yes: storedVotes[q.id]?.yes || 0,
            no: storedVotes[q.id]?.no || 0,
        }));
        
        return fullQuestions;
    },
    submitVote: async (questionId: number, vote: 'yes' | 'no'): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500)); 
        const storedVotes = JSON.parse(localStorage.getItem(DB_VOTES_KEY) || '{}');
        if (!storedVotes[questionId]) {
            storedVotes[questionId] = { yes: 0, no: 0 };
        }
        storedVotes[questionId][vote]++;
        localStorage.setItem(DB_VOTES_KEY, JSON.stringify(storedVotes));
    }
};

// ============================================================================
// RASTREADOR DE VOTOS DO USUÁRIO
// ============================================================================
const USER_VOTES_KEY = 'versus_user_votes';
type UserVotes = Record<number, 'yes' | 'no' | 'skipped'>;

const userVoteTracker = {
    load: (): UserVotes => JSON.parse(localStorage.getItem(USER_VOTES_KEY) || '{}'),
    save: (votes: UserVotes) => localStorage.setItem(USER_VOTES_KEY, JSON.stringify(votes)),
};

// ============================================================================
// COMPONENTE REACT
// ============================================================================
interface QuestionsProps {
    onGoHome: () => void;
}

const Questions: React.FC<QuestionsProps> = ({ onGoHome }) => {
    const { language, t } = useLanguage();
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [userVotes, setUserVotes] = useState<UserVotes>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [viewMode, setViewMode] = useState<'voting' | 'explanation'>('voting');
    const [isFinished, setIsFinished] = useState(false);
    const [justVoted, setJustVoted] = useState<'yes' | 'no' | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedQuestions = await api.fetchQuestions(language);
                const loadedUserVotes = userVoteTracker.load();
                setQuestions(fetchedQuestions);
                setUserVotes(loadedUserVotes);
            } catch (err: any) {
                setError(err.message || 'Ocorreu um erro desconhecido.');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [language]);

    const handleVote = async (option: 'yes' | 'no') => {
        if (!questions) return;
        const currentQuestion = questions[currentQuestionIndex];
        if (userVotes[currentQuestion.id]) return;

        setJustVoted(option);

        const updatedQuestions = questions.map((q, index) => {
            if (index === currentQuestionIndex) {
                return { ...q, [option]: q[option] + 1 };
            }
            return q;
        });
        setQuestions(updatedQuestions);

        const updatedUserVotes = { ...userVotes, [currentQuestion.id]: option };
        setUserVotes(updatedUserVotes);
        userVoteTracker.save(updatedUserVotes);

        try {
            await api.submitVote(currentQuestion.id, option);
        } catch (err) {
            console.error("Falha ao submeter o voto:", err);
        }
    };
    
    const handleNextQuestion = () => {
        if (!questions) return;
        const currentQuestion = questions[currentQuestionIndex];
        
        if (!userVotes[currentQuestion.id]) {
            const updatedUserVotes = { ...userVotes, [currentQuestion.id]: 'skipped' as const };
            setUserVotes(updatedUserVotes);
            userVoteTracker.save(updatedUserVotes);
        }

        setJustVoted(null);
        setViewMode('voting');

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setJustVoted(null);
            setViewMode('voting');
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-white">
                 <svg className="w-24 h-24 animate-spin text-[#A385E8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-xl font-bold tracking-wider">{t('loadingDuels')}</p>
            </div>
        );
    }

    if (error) {
         return (
            <div className="flex flex-col items-center justify-center h-screen text-white text-center p-4">
                <h2 className="text-3xl font-bold text-[#E83D84] mb-4">{t('errorTitle')}</h2>
                <p className="text-lg mb-8 max-w-md">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 font-bold text-lg text-white border-2 border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] transform hover:scale-105">
                    {t('errorButton')}
                </button>
            </div>
        );
    }

    if (isFinished || !questions) {
        return (
            <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-4 py-16 animate-fade-in">
                <div className="w-full max-w-3xl p-8 bg-[#1a1a3d] rounded-2xl shadow-2xl border border-[#A385E8]/20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mt-2 mb-8">
                        {t('summaryTitle')}
                    </h2>
                    
                    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                        {questions?.map(q => {
                            const total = q.yes + q.no;
                            const yesP = total > 0 ? ((q.yes / total) * 100).toFixed(0) : "50";
                            const noP = total > 0 ? ((q.no / total) * 100).toFixed(0) : "50";
                            
                            const userVote = userVotes[q.id];
                            const userVoteText = userVote === 'yes' ? t('voteYes') : userVote === 'no' ? t('voteNo') : t('voteSkipped');
                            const userVoteColor = userVote === 'yes' ? 'text-[#3DE8E8]' : userVote === 'no' ? 'text-[#E83D84]' : 'text-gray-400';

                            return (
                                <div key={q.id} className="p-4 bg-[#0C0C2D]/50 rounded-lg border border-white/10">
                                    <p className="text-lg font-semibold text-white mb-3">{q.text}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="font-bold">{t('summaryYourAnswer')} <span className={userVoteColor}>{userVoteText}</span></p>
                                        <div className="flex items-center space-x-3 font-mono">
                                             <span className="text-[#3DE8E8]">{yesP}% {t('voteYes')}</span>
                                             <span>/</span>
                                             <span className="text-[#E83D84]">{noP}% {t('voteNo')}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="text-center mt-10">
                        <button
                            onClick={onGoHome}
                            className="px-8 py-3 font-bold text-lg text-white border-2 border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_25px_#A385E8] transform hover:scale-105">
                            {t('buttonGoHome')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    const hasVotedOnCurrent = !!userVotes[currentQuestion.id] && userVotes[currentQuestion.id] !== 'skipped';
    const showResults = hasVotedOnCurrent || justVoted;

    const totalVotes = currentQuestion.yes + currentQuestion.no;
    const yesPercentage = totalVotes > 0 ? ((currentQuestion.yes / totalVotes) * 100).toFixed(0) : "50";
    const noPercentage = totalVotes > 0 ? ((currentQuestion.no / totalVotes) * 100).toFixed(0) : "50";
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    if (viewMode === 'explanation') {
        return (
             <div className="relative flex flex-col items-center justify-center w-full h-full p-4 animate-fade-in">
                <button
                    onClick={onGoHome}
                    className="absolute top-6 left-6 px-4 py-2 font-bold text-sm text-[#A385E8] border border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_15px_#A385E8] z-20"
                    aria-label="Voltar para a página inicial">
                    &larr; {t('buttonGoHome')}
                </button>
                 <div className="w-full max-w-xs mx-auto mb-8">
                    <p className="text-center text-sm font-bold text-[#A385E8] mb-2 tracking-wider">
                        {t('questionProgress', { current: currentQuestionIndex + 1, total: questions.length })}
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-2.5 border border-white/20">
                        <div
                            className="bg-[#A385E8] h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%`, boxShadow: '0 0 10px #A385E8' }}
                        ></div>
                    </div>
                </div>
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
                            {t('buttonBack')}
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
                &larr; {t('buttonGoHome')}
            </button>

            <div className="w-full max-w-xs mx-auto mb-8">
                <p className="text-center text-sm font-bold text-[#A385E8] mb-2 tracking-wider">
                     {t('questionProgress', { current: currentQuestionIndex + 1, total: questions.length })}
                </p>
                <div className="w-full bg-white/10 rounded-full h-2.5 border border-white/20">
                    <div
                        className="bg-[#A385E8] h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%`, boxShadow: '0 0 10px #A385E8' }}
                    ></div>
                </div>
            </div>

            <div className="w-full max-w-2xl p-8 bg-[#1a1a3d] rounded-2xl shadow-2xl border border-[#A385E8]/20">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 tracking-wide">
                    {currentQuestion.text}
                </h2>

                <div className="flex justify-between items-center space-x-4 mb-4">
                     <button
                        onClick={() => handleVote('no')}
                        disabled={hasVotedOnCurrent}
                        className={`w-full px-6 py-3 font-bold text-xl text-white bg-[#E83D84] rounded-lg transition-all duration-300 ease-in-out transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${justVoted === 'no' ? 'animate-pulse-vote-no' : hasVotedOnCurrent ? '' : 'hover:scale-105 hover:shadow-[0_0_20px_#E83D84]'}`}>
                        {t('voteNo')}
                    </button>
                    <button
                        onClick={() => handleVote('yes')}
                        disabled={hasVotedOnCurrent}
                        className={`w-full px-6 py-3 font-bold text-xl text-white bg-[#3DE8E8] rounded-lg transition-all duration-300 ease-in-out transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${justVoted === 'yes' ? 'animate-pulse-vote-yes' : hasVotedOnCurrent ? '' : 'hover:scale-105 hover:shadow-[0_0_20px_#3DE8E8]'}`}>
                        {t('voteYes')}
                    </button>
                </div>

                {showResults && (
                    <div className="mt-8 animate-fade-in">
                        <div className="relative w-full h-10 bg-[#0C0C2D] rounded-full overflow-hidden flex border-2 border-[#A385E8]/50">
                            <div
                                className="h-full bg-[#E83D84] flex items-center justify-start pl-4 text-white font-bold transition-all duration-700 ease-out"
                                style={{ width: `${noPercentage}%` }}>
                                {parseInt(noPercentage) > 10 && `${noPercentage}%`}
                            </div>
                            <div
                                className="h-full bg-[#3DE8E8] flex items-center justify-end pr-4 text-[#0C0C2D] font-bold transition-all duration-700 ease-out"
                                style={{ width: `${yesPercentage}%` }}>
                                {parseInt(yesPercentage) > 10 && `${yesPercentage}%`}
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="mt-8 flex justify-center items-center space-x-4">
                    {currentQuestionIndex > 0 && (
                         <button
                            onClick={handlePreviousQuestion}
                            className="px-5 py-2 font-bold text-sm text-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8]/20 transform hover:scale-105"
                            aria-label="Voltar para a pergunta anterior">
                            &larr; {t('buttonBack')}
                        </button>
                    )}
                    <button
                        onClick={handleNextQuestion}
                        className="px-8 py-3 font-bold text-lg text-white border-2 border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8] hover:text-[#0C0C2D] hover:shadow-[0_0_25px_#A385E8] transform hover:scale-105">
                        {isLastQuestion ? t('buttonFinish') : t('buttonNext')}
                    </button>
                </div>
            </div>
            
            <button
                onClick={() => setViewMode('explanation')}
                className="mt-8 px-5 py-2 font-bold text-sm text-[#A385E8] border border-[#A385E8] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#A385E8]/20 transform hover:scale-105"
                aria-label="Entenda o contexto da pergunta">
                {t('buttonUnderstand')}
            </button>
        </div>
    );
};

export default Questions;
