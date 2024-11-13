import React, { useState } from "react";
import "../styles/StartPage.css";

interface StartPageProps {
    onStartQuiz: (category: number | null, difficulty: string | null) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartQuiz }) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
        null
    );

    const handleStartClick = () => {
        onStartQuiz(selectedCategory, selectedDifficulty);
    };

    return (
        <div className="start-page">
            <h1>Quiz Uygulamasına Hoş Geldiniz!</h1>
            <div className="form-group">
                <label htmlFor="category">Kategori Seçin:</label>
                <select
                    id="category"
                    value={selectedCategory || ""}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value ? Number(e.target.value) : null)
                    }
                >
                    <option value="">Tümü</option>
                    <option value="9">Genel Kültür</option>
                    <option value="17">Bilim ve Doğa</option>
                    <option value="18">Bilgisayar Bilimleri</option>
                    <option value="23">Tarih</option>
                    <option value="21">Spor</option>
                    {/* Diğer kategorileri buraya ekleyebilirsiniz */}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="difficulty">Zorluk Seviyesi Seçin:</label>
                <select
                    id="difficulty"
                    value={selectedDifficulty || ""}
                    onChange={(e) =>
                        setSelectedDifficulty(e.target.value || null)
                    }
                >
                    <option value="">Tümü</option>
                    <option value="easy">Kolay</option>
                    <option value="medium">Orta</option>
                    <option value="hard">Zor</option>
                </select>
            </div>
            <button onClick={handleStartClick}>Quiz'e Başla</button>
        </div>
    );
};

export default StartPage;
