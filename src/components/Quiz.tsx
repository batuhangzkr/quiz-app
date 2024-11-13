// src/components/Quiz.tsx
import { useEffect, useState } from "react";
import { fetchQuestions } from "../api/api";
import { Question as QuestionType } from "../types/types";
import StartPage from "./StartPage";
import Question from "./Question";
import Timer from "./Timer";
import Result from "./Result";
import "../styles/Quiz.css";

interface ProcessedQuestion extends QuestionType {
    all_answers: string[];
}

function Quiz() {
    const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

    const handleStartQuiz = (category: number | null, difficulty: string | null) => {
        setSelectedCategory(category);
        setSelectedDifficulty(difficulty);
        setIsQuizStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setIsQuizFinished(false);
    };

    useEffect(() => {
        if (isQuizStarted) {
            const getQuestions = async () => {
                const data = await fetchQuestions(
                    10,
                    selectedCategory !== null ? selectedCategory : undefined,
                    selectedDifficulty !== null ? selectedDifficulty : undefined
                );
                const processedQuestions = data.results.map((question) => ({
                    ...question,
                    all_answers: [question.correct_answer, ...question.incorrect_answers],
                }));
                setQuestions(processedQuestions);
            };
            getQuestions();
        }
    }, [isQuizStarted, selectedCategory, selectedDifficulty]);



    useEffect(() => {
        if (!isQuizStarted || isQuizFinished) return;
        if (timer === 0) {
            handleNextQuestion();
        }
        const countdown = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer, isQuizStarted, isQuizFinished]);

    const handleNextQuestion = () => {
        setTimer(30);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setIsQuizFinished(true);
        }
    };

    // Eksik olan handleAnswer fonksiyonunu burada tanımlıyoruz
    const handleAnswer = (answer: string) => {
        // Kullanıcının cevabını userAnswers dizisine kaydet
        setUserAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = answer;
            return newAnswers;
        });

        // Doğru cevabı kontrol et ve puanı güncelle
        if (questions[currentQuestionIndex].correct_answer === answer) {
            setScore((prevScore) => prevScore + 1);
        }
        handleNextQuestion();
    };

    if (!isQuizStarted) {
        return <StartPage onStartQuiz={handleStartQuiz} />;
    }

    if (isQuizFinished) {
        return <Result score={score} total={questions.length} questions={questions} userAnswers={userAnswers} />;
    }

    return (
        <div className="quiz">
            <h1>Quiz</h1>
            <Timer timer={timer} />
            {questions.length > 0 && (
                <Question
                    questionData={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                />
            )}
        </div>
    );
}

export default Quiz;
