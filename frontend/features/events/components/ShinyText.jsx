'use client';

export default function ShinyText({
    text,
    speed = 4,
    className = '',
    style = {}
}) {
    return (
        <span
            className={`shiny-text ${className}`}
            style={{
                animationDuration: `${speed}s`,
                ...style
            }}
        >
            {text}
        </span>
    );
}
