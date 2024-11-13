import React from "react";
import "../styles/Question.css";

interface QuestionProps {
    questionData: {
        question: string;
        all_answers: string[];
        correct_answer: string;
    };
    onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ questionData, onAnswer }) => {
    return (
        <div className="question-card">
            <p>{questionData.question}</p>
            {questionData.all_answers.map((answer, index) => (
                <button key={index} onClick={() => onAnswer(answer)}>
                    {answer}
                </button>
            ))}
        </div>
    );
};

export default Question;
