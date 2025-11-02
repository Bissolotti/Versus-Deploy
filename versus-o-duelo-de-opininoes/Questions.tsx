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
    const [forceShowResults, setForceShowResults] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedQuestions = await api.fetchQuestions(language);
                const loadedUserVotes = userVoteTracker.load();

                // Find the first unanswered question
                const firstUnansweredIndex = fetchedQuestions.findIndex(q => !loadedUserVotes[q.id]);
                
                setQuestions(fetchedQuestions);
                setUserVotes(loadedUserVotes);
                setCurrentQuestionIndex(firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0);
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
        const currentVote = userVotes[currentQuestion.id];

        // Allow voting only if not already voted 'yes' or 'no'
        if (currentVote === 'yes' || currentVote === 'no') return;

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
            setUserVotes(updatedUser