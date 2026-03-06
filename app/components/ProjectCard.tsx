"use client";

import React from "react";

interface ProjectCardProps {
    name: string;
    status: string;
    location: string;
    image: string;
    delay?: number;
}

export default function ProjectCard({
    name,
    status,
    location,
    image,
    delay = 0,
}: ProjectCardProps) {
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const img = e.currentTarget.querySelector(
            "img"
        ) as HTMLImageElement | null;
        if (img) {
            img.style.transform = "scale(1.06)";
            img.style.filter = "brightness(0.88) saturate(0.8)";
        }
        const arrow = e.currentTarget.querySelector(
            ".card-arrow"
        ) as HTMLDivElement | null;
        if (arrow) arrow.style.transform = "translate(2px,-2px)";
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const img = e.currentTarget.querySelector(
            "img"
        ) as HTMLImageElement | null;
        if (img) {
            img.style.transform = "scale(1)";
            img.style.filter = "brightness(0.78) saturate(0.65)";
        }
        const arrow = e.currentTarget.querySelector(
            ".card-arrow"
        ) as HTMLDivElement | null;
        if (arrow) arrow.style.transform = "none";
    };

    return (
        <div
            style={{
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                background: "#1a1a1a",
                aspectRatio: "3/3.5",
                cursor: "pointer",
                animationDelay: `${delay}s`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={image}
                alt={name}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "brightness(0.78) saturate(0.65)",
                    transition:
                        "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s",
                }}
            />

            <div
                className="card-arrow"
                style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    width: 30,
                    height: 30,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    transition: "background 0.25s, transform 0.3s",
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
                    <path d="M4 12L12 4M5 4h7v7" />
                </svg>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "52px 18px 18px",
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                }}
            >
                <div
                    style={{
                        width: 28,
                        height: 28,
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 7,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                        color: "rgba(255,255,255,0.75)",
                    }}
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        width={13}
                        height={13}
                    >
                        <path d="M2 14V8l6-5 6 5v6H2z" />
                        <rect x="5" y="10" width="3" height="4" />
                    </svg>
                </div>
                <div
                    style={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 6,
                    }}
                >
                    {name}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.48)",
                            fontStyle: "italic",
                        }}
                    >
                        {status}
                    </span>
                    <span
                        style={{
                            fontSize: 10,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.36)",
                        }}
                    >
                        {location}
                    </span>
                </div>
            </div>
        </div>
    );
}
