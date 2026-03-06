"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
    name: string;
    status: string;
    location: string;
    image: string;
    category: string;
}

interface WorksProps {
    projects?: Project[];
}

const DEFAULT_PROJECTS: Project[] = [
    {
        name: "Project Alpha",
        status: "Shipped",
        location: "GitHub",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        category: "Personal",
    },
    {
        name: "Project Beta",
        status: "In Progress",
        location: "Remote",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
        category: "Work",
    },
    {
        name: "Project Gamma",
        status: "Open Source",
        location: "Global",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        category: "Experimental",
    },
];

const TABS = ["Personal", "Work", "Experimental"] as const;
type Tab = (typeof TABS)[number];

export default function Works({ projects = DEFAULT_PROJECTS }: WorksProps) {
    const [activeTab, setActiveTab] = useState<Tab>("Personal");

    const filtered =
        activeTab === "Personal"
            ? projects
            : projects.filter((p) => p.category === activeTab);

    return (
        <section
            id="works"
            style={{ padding: "96px 32px 108px", background: "#f5f5f5" }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 60,
                }}
            >
                <div style={{ position: "relative", paddingTop: 10 }}>
                    <div
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "clamp(70px,13vw,170px)",
                            fontWeight: 800,
                            color: "rgba(0,0,0,0.032)",
                            lineHeight: 0.85,
                            position: "absolute",
                            top: -10,
                            left: -6,
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            letterSpacing: "-0.04em",
                        }}
                    >
                        Works
                    </div>
                    <p
                        style={{
                            fontSize: 10,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#666",
                            marginBottom: 10,
                            position: "relative",
                        }}
                    >
                        Selected Works
                    </p>
                    <h2
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "clamp(34px,5vw,58px)",
                            fontWeight: 700,
                            lineHeight: 1,
                            color: "#0a0a0a",
                            position: "relative",
                            margin: 0,
                        }}
                    >
                        Defined{" "}
                        <span style={{ color: "rgba(0,0,0,0.2)" }}>-</span>
                        <br />
                        Horizons
                        <span style={{ color: "rgba(0,0,0,0.2)" }}>.</span>
                    </h2>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 24,
                        alignItems: "center",
                        alignSelf: "flex-end",
                        paddingBottom: 4,
                    }}
                >
                    {TABS.map((tab) => (
                        <span
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                fontSize: 14,
                                color: activeTab === tab ? "#0a0a0a" : "#666",
                                cursor: "pointer",
                                paddingBottom: 4,
                                borderBottom:
                                    activeTab === tab
                                        ? "2px solid #0a0a0a"
                                        : "2px solid transparent",
                                transition: "color 0.2s, border-color 0.25s",
                            }}
                        >
                            {tab}
                        </span>
                    ))}
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 14,
                    marginBottom: 44,
                }}
            >
                {filtered.map((project, i) => (
                    <ProjectCard
                        key={project.name}
                        {...project}
                        delay={i * 0.12}
                    />
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <a
                    href="#"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        background: "#0a0a0a",
                        color: "#fff",
                        border: "none",
                        borderRadius: 999,
                        padding: "15px 30px",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "background 0.25s, transform 0.25s",
                    }}
                    onMouseEnter={(e) =>
                        ((
                            e.currentTarget as HTMLAnchorElement
                        ).style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                        ((
                            e.currentTarget as HTMLAnchorElement
                        ).style.transform = "none")
                    }
                >
                    View All Projects
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
        </section>
    );
}
