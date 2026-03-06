"use client";

import { useEffect, useRef } from "react";

interface Skill {
    name: string;
    category: string;
    proficiency: number;
    years: string;
    projects: string;
    tier: string;
    image: string;
}

interface SkillsProps {
    skills?: Skill[];
}

const DEFAULT_SKILLS: Skill[] = [
    {
        name: "React / Next.js",
        category: "Frontend",
        proficiency: 90,
        years: "3 yrs",
        projects: "12+",
        tier: "S",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80",
    },
    {
        name: "TypeScript",
        category: "Language",
        proficiency: 80,
        years: "2 yrs",
        projects: "8+",
        tier: "A",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80",
    },
    {
        name: "Node.js",
        category: "Backend",
        proficiency: 70,
        years: "2 yrs",
        projects: "6+",
        tier: "A",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
    },
];

function SkillRow({
    name,
    category,
    proficiency,
    years,
    projects,
    tier,
    image,
}: Skill) {
    const rowRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && barRef.current) {
                    setTimeout(() => {
                        if (barRef.current)
                            barRef.current.style.width = proficiency + "%";
                    }, 350);
                    observer.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        if (rowRef.current) observer.observe(rowRef.current);
        return () => observer.disconnect();
    }, [proficiency]);

    const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "#3a3a3a";
        e.currentTarget.style.background = "#1e1e1e";
        e.currentTarget.style.transform = "translateX(5px)";
    };

    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "#2a2a2a";
        e.currentTarget.style.background = "#1a1a1a";
        e.currentTarget.style.transform = "none";
    };

    return (
        <div
            ref={rowRef}
            style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: "18px 22px",
                display: "grid",
                gridTemplateColumns: "58px 1fr auto auto",
                gap: 18,
                alignItems: "center",
                cursor: "pointer",
                transition:
                    "border-color 0.3s, background 0.3s, transform 0.3s",
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <img
                src={image}
                alt={name}
                style={{
                    width: 52,
                    height: 52,
                    borderRadius: 9,
                    objectFit: "cover",
                    filter: "saturate(0.5) brightness(0.9)",
                }}
            />
            <div>
                <div
                    style={{
                        fontWeight: 600,
                        color: "#fff",
                        fontSize: 13,
                        marginBottom: 2,
                    }}
                >
                    {name}
                </div>
                <div
                    style={{
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#666",
                    }}
                >
                    {category}
                </div>
                <div
                    style={{
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        color: "#666",
                        textTransform: "uppercase",
                        marginTop: 8,
                        marginBottom: 4,
                    }}
                >
                    Proficiency
                </div>
                <div
                    style={{
                        height: 3,
                        background: "#3a3a3a",
                        borderRadius: 2,
                        width: 130,
                        overflow: "hidden",
                    }}
                >
                    <div
                        ref={barRef}
                        style={{
                            height: "100%",
                            background: "linear-gradient(to right, #444, #aaa)",
                            borderRadius: 2,
                            width: "0%",
                            transition:
                                "width 1.3s cubic-bezier(0.22,1,0.36,1)",
                        }}
                    />
                </div>
            </div>
            <div style={{ display: "flex", gap: 28, alignItems: "start" }}>
                {(
                    [
                        { label: "Experience", value: years },
                        { label: "Projects", value: projects },
                    ] as const
                ).map(({ label, value }) => (
                    <div key={label}>
                        <label
                            style={{
                                fontSize: 9,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#666",
                                marginBottom: 3,
                                display: "block",
                            }}
                        >
                            {label}
                        </label>
                        <span style={{ fontSize: 12, color: "#bbb" }}>
                            {value}
                        </span>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#fff",
                    }}
                >
                    Tier {tier}
                </span>
            </div>
        </div>
    );
}

export default function Skills({ skills = DEFAULT_SKILLS }: SkillsProps) {
    return (
        <section
            id="skills"
            style={{ background: "#0a0a0a", padding: "88px 32px 80px" }}
        >
            <div
                style={{
                    textAlign: "center",
                    marginBottom: 48,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        right: -8,
                        top: -24,
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(60px,10vw,130px)",
                        fontWeight: 800,
                        color: "rgba(255,255,255,0.022)",
                        letterSpacing: "-0.03em",
                        whiteSpace: "nowrap",
                        lineHeight: 1,
                        pointerEvents: "none",
                    }}
                >
                    Tech
                </div>
                <h2
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(26px,4vw,40px)",
                        fontWeight: 400,
                        color: "#fff",
                        marginBottom: 8,
                        letterSpacing: "-0.01em",
                    }}
                >
                    Technical Stack
                </h2>
                <p style={{ fontSize: 13, color: "#666" }}>
                    Tools and technologies I reach for first.
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    maxWidth: 860,
                    margin: "0 auto",
                }}
            >
                {skills.map((skill) => (
                    <SkillRow key={skill.name} {...skill} />
                ))}
            </div>
        </section>
    );
}
