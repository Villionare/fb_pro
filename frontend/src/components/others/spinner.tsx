import { useEffect, useState } from "react";

export default function Spinner() {
    const frames = ["/", "-", "\\", "|"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % frames.length);
        }, 100); // speed

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="text-white">
            {frames[index]}
        </span>
    );
}
