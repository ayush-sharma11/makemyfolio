"use client";

import React from "react";

interface Job {
    title: string;
    company: string;
    location: string;
    type: string;
    period: string;
}

interface ExperienceProps {
    experience?: Job[];
}

const DEFAULT_EXPERIENCE: Job[] = [
    {
        title: "Senior Frontend Engineer",
        company: "Acme Corp",
        location: "Remote",
        type: "Full-Time",
        period: "2023–Present",
    },
    {
        title: "UI Developer",
        company: "Studio XYZ",
        location: "New York",
        type: "Contract",
        period: "2022–2023",
    },
    {
        title: "Junior Developer",
        company: "StartupABC",
        location: "London",
        type: "Full-Time",
        period: "2021–2022",
    },
];

export default function Experience({
    experience = DEFAULT_EXPERIENCE,
}: ExperienceProps) {
    const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "#3a3a3a";
        e.currentTarget.style.background = "#1e1e1e";
        e.currentTarget.style.transform = "translateX(6px)";
    };

    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "#2a2a2a";
        e.currentTarget.style.background = "#1a1a1a";
        e.currentTarget.style.transform = "none";
    };

    return (
        <section
            id="experience"
            style={{
                background: "#0a0a0a",
                padding: "40px 32px 88px",
                borderTop: "1px solid #2a2a2a",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 48,
                    marginBottom: 44,
                    alignItems: "start",
                }}
            >
                <div>
                    <p
                        style={{
                            fontSize: 10,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#666",
                            marginBottom: 12,
                        }}
                    >
                        Career
                    </p>
                    <h2
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "clamp(30px,5vw,52px)",
                            fontWeight: 700,
                            color: "#fff",
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        Where I&apos;ve
                        <br />
                        <span style={{ color: "rgba(255,255,255,0.24)" }}>
                            Been.
                        </span>
                    </h2>
                </div>
                <p
                    style={{
                        alignSelf: "end",
                        fontSize: 13,
                        color: "#666",
                        lineHeight: 1.75,
                        maxWidth: 400,
                        margin: 0,
                    }}
                >
                    A track record of shipping products that people use and care
                    about.
                </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {experience.map((job, i) => (
                    <div
                        key={i}
                        style={{
                            background: "#1a1a1a",
                            border: "1px solid #2a2a2a",
                            borderRadius: 12,
                            padding: "16px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            cursor: "pointer",
                            transition:
                                "border-color 0.25s, background 0.25s, transform 0.3s",
                        }}
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 9,
                                background: "#2a2a2a",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#999",
                                flexShrink: 0,
                            }}
                        >
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                width={16}
                                height={16}
                            >
                                <rect
                                    x="3"
                                    y="7"
                                    width="14"
                                    height="10"
                                    rx="2"
                                />
                                <path d="M7 7V5a3 3 0 016 0v2" />
                            </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div
                                style={{
                                    fontWeight: 600,
                                    color: "#fff",
                                    fontSize: 13,
                                }}
                            >
                                {job.title}
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: "#666",
                                    marginTop: 2,
                                }}
                            >
                                {job.company}
                                <span
                                    style={{
                                        color: "#2a2a2a",
                                        margin: "0 4px",
                                    }}
                                >
                                    •
                                </span>
                                {job.location}
                                <span
                                    style={{
                                        color: "#2a2a2a",
                                        margin: "0 4px",
                                    }}
                                >
                                    •
                                </span>
                                {job.period}
                            </div>
                        </div>
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 500,
                                border: "1px solid #3a3a3a",
                                borderRadius: 999,
                                padding: "3px 10px",
                                color: "#999",
                                letterSpacing: "0.05em",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {job.type}
                        </span>
                        <button
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 7,
                                background: "#2a2a2a",
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "#999",
                            }}
                        >
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                width={12}
                                height={12}
                            >
                                <path d="M3 8h10M9 4l4 4-4 4" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
