"use client";

import React from "react";

interface Phase {
    num: string;
    name: string;
    desc: string;
    icon: React.ReactNode;
}

interface MethodologyProps {
    phases?: Phase[];
}

const DEFAULT_PHASES: Phase[] = [
    {
        num: "Phase I",
        name: "Research",
        desc: "Understanding the problem space deeply before writing a single line of code.",
        icon: (
            <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                width={16}
                height={16}
            >
                <circle cx="8" cy="8" r="5" />
                <path d="M8 5v3l2 2" />
            </svg>
        ),
    },
    {
        num: "Phase II",
        name: "Design",
        desc: "Translating requirements into interfaces. Wireframes, prototypes, and systems thinking.",
        icon: (
            <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                width={16}
                height={16}
            >
                <path d="M2 14L8 2l6 12" />
                <path d="M4.5 10h7" />
            </svg>
        ),
    },
    {
        num: "Phase III",
        name: "Build",
        desc: "Clean, maintainable code. Component-driven. Tested. Documented.",
        icon: (
            <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                width={16}
                height={16}
            >
                <rect x="2" y="4" width="12" height="9" rx="1.5" />
                <path d="M5 4V3m6 1V3" />
            </svg>
        ),
    },
    {
        num: "Phase IV",
        name: "Ship",
        desc: "Deploy with confidence. Monitor, iterate, and never stop improving.",
        icon: (
            <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                width={16}
                height={16}
            >
                <path d="M3 8l3 3 7-7" />
            </svg>
        ),
    },
];

export default function Methodology({
    phases = DEFAULT_PHASES,
}: MethodologyProps) {
    const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "#bbb";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.09)";
        e.currentTarget.style.transform = "translateY(-5px)";
    };

    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "#e4e4e4";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
    };

    return (
        <section
            id="methodology"
            style={{
                padding: "88px 32px 72px",
                background: "#f5f5f5",
                textAlign: "center",
            }}
        >
            <p
                style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#666",
                    marginBottom: 14,
                }}
            >
                Core Principles
            </p>
            <h2
                style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(30px,5vw,52px)",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: 14,
                    letterSpacing: "-0.02em",
                }}
            >
                How I Work
            </h2>
            <p
                style={{
                    fontSize: 13,
                    color: "#666",
                    maxWidth: 440,
                    margin: "0 auto 60px",
                    lineHeight: 1.75,
                }}
            >
                A disciplined process from abstract problem to concrete, shipped
                solution.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: 10,
                    marginBottom: 52,
                }}
            >
                {phases.map((phase, i) => (
                    <div
                        key={i}
                        style={{
                            border: "1px solid #e4e4e4",
                            borderRadius: 16,
                            padding: "28px 22px 24px",
                            textAlign: "left",
                            background: "#fff",
                            cursor: "pointer",
                            transition:
                                "border-color 0.3s, box-shadow 0.3s, transform 0.35s",
                        }}
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 9,
                                background: "#f0f0f0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 16,
                                color: "#666",
                            }}
                        >
                            {phase.icon}
                        </div>
                        <div
                            style={{
                                fontSize: 9,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#666",
                                marginBottom: 8,
                            }}
                        >
                            {phase.num}
                        </div>
                        <div
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 17,
                                fontWeight: 700,
                                color: "#0a0a0a",
                                marginBottom: 10,
                            }}
                        >
                            {phase.name}
                        </div>
                        <p
                            style={{
                                fontSize: 12,
                                color: "#666",
                                lineHeight: 1.72,
                                margin: 0,
                            }}
                        >
                            {phase.desc}
                        </p>
                    </div>
                ))}
            </div>

            <a
                href="mailto:hello@yoursite.com"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "transparent",
                    border: "1px solid #ccc",
                    borderRadius: 999,
                    padding: "13px 28px",
                    fontSize: 13,
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#0a0a0a",
                    transition:
                        "border-color 0.25s, background 0.25s, transform 0.25s",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#0a0a0a";
                    e.currentTarget.style.background = "#ebebeb";
                    e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ccc";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "none";
                }}
            >
                Get In Touch
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
        </section>
    );
}
