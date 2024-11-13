import React from "react";
import { Question as QuestionType } from "../types/types";
import "../styles/Result.css";

interface ResultProps {
    score: number;
    total: number;
    questions: QuestionType[];
    userAnswers: string[];
}

const Result: React.FC<ResultProps> = ({ score, total, questions, userAnswers }) => {
    return (
        <div className="result">
            <h1>Quiz Bitti!</h1>
            <h2>{total} sorunun {score} tanesine doğru yanıt verdiniz. </h2>
            <h2>Skorunuz: {score / total * 100}</h2>
            <h2>Yanlış Cevapladığınız Sorular:</h2>
            {questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correct_answer;

                if (isCorrect) return null;

                return (
                    <div key={index} className="wrong-answer">
                        <p><strong>Soru:</strong> {question.question}</p>
                        <p><strong>Verdiğiniz Cevap:</strong> {userAnswer || "Cevaplanmadı"}</p>
                        <p><strong>Doğru Cevap:</strong> {question.correct_answer}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Result;
