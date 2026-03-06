"use client";

import { useEffect, useRef, useState } from "react";

interface HeroProps {
    name?: string;
    title?: string;
    openToWork?: boolean;
    projectCount?: number;
    awardsCount?: number;
}

function useCounter(target: number, duration = 1400, delay = 750): number {
    const [value, setValue] = useState<number>(0);
    useEffect(() => {
        const timeout = setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                setValue(Math.round(ease * target));
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, delay);
        return () => clearTimeout(timeout);
    }, [target, duration, delay]);
    return value;
}

export default function Hero({
    name = "YOUR NAME",
    title = "Developer & Designer",
    openToWork = true,
    projectCount = 42,
    awardsCount = 18,
}: HeroProps) {
    const bgRef = useRef<HTMLDivElement>(null);
    const projects = useCounter(projectCount);
    const awards = useCounter(awardsCount);
    const titleParts = name.toUpperCase().split(" ");

    useEffect(() => {
        const handler = () => {
            const sy = window.scrollY;
            if (bgRef.current && sy < window.innerHeight * 1.2) {
                bgRef.current.style.transform = `translateY(${sy * 0.32}px)`;
            }
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <section
            style={{
                position: "relative",
                height: "100vh",
                minHeight: 620,
                background: "#111",
                overflow: "hidden",
            }}
        >
            <div
                ref={bgRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.42) saturate(0.15)",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                        "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px)",
                }}
            />

            {openToWork && (
                <div
                    style={{
                        position: "absolute",
                        top: 80,
                        right: 32,
                        background: "rgba(12,12,12,0.82)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 8,
                        padding: "8px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 11,
                        color: "#fff",
                        letterSpacing: "0.06em",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#4ade80",
                            boxShadow: "0 0 8px #4ade80",
                            animation: "blink 1.8s infinite",
                        }}
                    />
                    OPEN TO WORK
                </div>
            )}

            <div
                style={{
                    position: "absolute",
                    bottom: 52,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    color: "rgba(255,255,255,0.32)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                }}
            >
                <span>SCROLL</span>
                <div
                    style={{
                        width: 1,
                        height: 40,
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                    }}
                />
            </div>

            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "0 32px 56px",
                }}
            >
                <p
                    style={{
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.36)",
                        marginBottom: 14,
                    }}
                >
                    {title}
                </p>
                <h1
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(72px, 11.5vw, 148px)",
                        fontWeight: 800,
                        lineHeight: 0.86,
                        color: "#fff",
                        letterSpacing: "-0.025em",
                        margin: 0,
                    }}
                >
                    {titleParts[0]}
                    {titleParts[1] && (
                        <>
                            <br />
                            <span
                                style={{
                                    paddingLeft: "clamp(36px, 5.5vw, 72px)",
                                }}
                            >
                                {titleParts.slice(1).join(" ")}
                            </span>
                        </>
                    )}
                </h1>
            </div>
            <div
                style={{
                    position: "absolute",
                    right: 32,
                    bottom: 56,
                    width: 284,
                    background: "rgba(10,10,10,0.86)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 16,
                    padding: "22px 22px 18px",
                    backdropFilter: "blur(20px)",
                    zIndex: 10,
                }}
            >
                <p
                    style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.68,
                        marginBottom: 18,
                    }}
                >
                    Building things for the web. Clarity, performance, and
                    craft.
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: 32,
                        paddingBottom: 16,
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        marginBottom: 16,
                    }}
                >
                    {[
                        { label: "Projects", value: projects },
                        { label: "Awards", value: awards },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: 9,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.36)",
                                    marginBottom: 3,
                                }}
                            >
                                {label}
                            </label>
                            <span
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: 30,
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                            >
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
                <a
                    href="#works"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: "rgba(255,255,255,0.78)",
                        fontSize: 12,
                        textDecoration: "none",
                    }}
                >
                    Explore Portfolio
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        width={14}
                        height={14}
                    >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                </a>
            </div>
            <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }`}</style>
        </section>
    );
}
