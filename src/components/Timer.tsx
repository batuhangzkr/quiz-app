import React from "react";
import "../styles/Timer.css";

interface TimerProps {
    timer: number;
}

const Timer: React.FC<TimerProps> = ({ timer }) => {
    return <div className="timer">Kalan Süre: {timer} saniye</div>;
};

export default Timer;
