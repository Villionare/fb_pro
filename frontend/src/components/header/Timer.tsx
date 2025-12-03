import React, { useEffect, useRef, useState } from "react";

interface TimerProps {
    hours: number;
    minutes: number;
    seconds: number;
    onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({ hours, minutes, seconds, onComplete }) => {

    // compute once only
    const initialSeconds = useRef(hours * 3600 + minutes * 60 + seconds);

    const [timeLeft, setTimeLeft] = useState(initialSeconds.current);

    const intervalRef = useRef<number | null>(null);

    // countdown effect (runs once)
    useEffect(() => {
        if (initialSeconds.current <= 0) {
            onComplete?.();
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    window.clearInterval(intervalRef.current!);

                    // call onComplete AFTER render
                    Promise.resolve().then(() => onComplete?.());

                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current!);
    }, []);

    // time formatting
    const pad = (n: number) => String(n).padStart(2, "0");
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;

    return (
        <div className="text-red">
            ({pad(hrs)}:{pad(mins)}:{pad(secs)})
        </div>
    );
};

export default Timer;
