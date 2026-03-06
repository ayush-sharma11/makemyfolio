"use client";

import { useState } from "react";
import {
    downloadHTML,
    generatePortfolioHTML,
    PortfolioData,
} from "../lib/export";

// ─── TYPES ───────────────────────────────────────────────────
interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stars: number;
}

interface GithubUser {
    name: string;
    bio: string;
    avatar_url: string;
    location: string;
}

interface SkillInput {
    name: string;
    category: string;
    years: string;
    proficiency: number;
}

interface ExperienceInput {
    title: string;
    company: string;
    location: string;
    type: string;
    period: string;
}

type Step = 1 | 2 | 3 | 4;

// ─── STYLES ──────────────────────────────────────────────────
const S = {
    page: {
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
        paddingBottom: 80,
    } as React.CSSProperties,

    header: {
        padding: "24px 32px",
        borderBottom: "1px solid #1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    } as React.CSSProperties,

    logo: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        color: "#fff",
        fontWeight: 600,
        fontSize: 14,
    } as React.CSSProperties,

    logoIcon: {
        width: 28,
        height: 28,
        background: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    } as React.CSSProperties,

    container: {
        maxWidth: 680,
        margin: "0 auto",
        padding: "56px 32px 0",
    } as React.CSSProperties,

    stepIndicator: {
        display: "flex",
        gap: 8,
        marginBottom: 48,
    } as React.CSSProperties,

    stepDot: (active: boolean, done: boolean) =>
        ({
            height: 3,
            flex: 1,
            borderRadius: 2,
            background: done
                ? "#fff"
                : active
                ? "rgba(255,255,255,0.6)"
                : "#2a2a2a",
            transition: "background 0.3s",
        } as React.CSSProperties),

    eyebrow: {
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase" as const,
        color: "#666",
        marginBottom: 10,
    },

    heading: {
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 700,
        lineHeight: 1.1,
        marginBottom: 8,
        color: "#fff",
    },

    sub: {
        fontSize: 13,
        color: "#666",
        lineHeight: 1.7,
        marginBottom: 40,
    },

    label: {
        display: "block",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: "#666",
        marginBottom: 8,
    },

    input: {
        width: "100%",
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: 10,
        padding: "13px 16px",
        fontSize: 13,
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        outline: "none",
        transition: "border-color 0.2s",
        marginBottom: 20,
    } as React.CSSProperties,

    textarea: {
        width: "100%",
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: 10,
        padding: "13px 16px",
        fontSize: 13,
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        outline: "none",
        resize: "vertical" as const,
        minHeight: 90,
        marginBottom: 20,
    } as React.CSSProperties,

    btnPrimary: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "#fff",
        color: "#0a0a0a",
        border: "none",
        borderRadius: 999,
        padding: "14px 28px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.2s, transform 0.2s",
    } as React.CSSProperties,

    btnSecondary: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "transparent",
        color: "#666",
        border: "1px solid #2a2a2a",
        borderRadius: 999,
        padding: "13px 24px",
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "border-color 0.2s, color 0.2s",
    } as React.CSSProperties,

    repoCard: (selected: boolean) =>
        ({
            background: selected ? "#1a1a1a" : "#111",
            border: `1px solid ${selected ? "#fff" : "#2a2a2a"}`,
            borderRadius: 12,
            padding: "16px 18px",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 14,
        } as React.CSSProperties),

    row: {
        display: "flex",
        gap: 12,
        marginBottom: 8,
    } as React.CSSProperties,

    card: {
        background: "#111",
        border: "1px solid #1a1a1a",
        borderRadius: 12,
        padding: "20px",
        marginBottom: 8,
    } as React.CSSProperties,

    removeBtn: {
        background: "none",
        border: "none",
        color: "#444",
        cursor: "pointer",
        fontSize: 18,
        lineHeight: 1,
        padding: "0 4px",
        transition: "color 0.2s",
    } as React.CSSProperties,

    toggle: (active: boolean) =>
        ({
            width: 44,
            height: 24,
            borderRadius: 999,
            background: active ? "#fff" : "#2a2a2a",
            position: "relative" as const,
            cursor: "pointer",
            transition: "background 0.25s",
            flexShrink: 0,
        } as React.CSSProperties),

    toggleDot: (active: boolean) =>
        ({
            position: "absolute" as const,
            top: 3,
            left: active ? 23 : 3,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: active ? "#0a0a0a" : "#666",
            transition: "left 0.25s, background 0.25s",
        } as React.CSSProperties),

    error: {
        background: "rgba(239,68,68,0.1)",
        border: "1px solid rgba(239,68,68,0.3)",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 13,
        color: "#f87171",
        marginBottom: 20,
    } as React.CSSProperties,

    successCard: {
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: 16,
        padding: 32,
        textAlign: "center" as const,
    } as React.CSSProperties,
};

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function GeneratePage() {
    const [step, setStep] = useState<Step>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Step 1
    const [username, setUsername] = useState("");
    const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);

    // Step 2
    const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());

    // Step 3
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");
    const [openToWork, setOpenToWork] = useState(true);
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState<SkillInput[]>([
        { name: "", category: "Frontend", years: "1 yr", proficiency: 70 },
    ]);
    const [experience, setExperience] = useState<ExperienceInput[]>([
        { title: "", company: "", location: "", type: "Full-Time", period: "" },
    ]);

    // Step 4
    const [generated, setGenerated] = useState<PortfolioData | null>(null);

    // ── Step 1: Fetch GitHub ──
    const fetchGitHub = async () => {
        if (!username.trim()) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/github?username=${username.trim()}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Not found");
            setGithubUser(data.user);
            setRepos(data.repos);
            if (data.user.name) setName(data.user.name);
            if (data.user.bio) setBio(data.user.bio);
            setStep(2);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "GitHub user not found");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: Toggle repo selection ──
    const toggleRepo = (id: number) => {
        setSelectedRepos((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else if (next.size < 6) next.add(id);
            return next;
        });
    };

    // ── Step 3: Skills & Experience helpers ──
    const addSkill = () =>
        setSkills((s) => [
            ...s,
            { name: "", category: "Frontend", years: "1 yr", proficiency: 70 },
        ]);

    const updateSkill = (
        i: number,
        field: keyof SkillInput,
        value: string | number
    ) =>
        setSkills((s) =>
            s.map((sk, idx) => (idx === i ? { ...sk, [field]: value } : sk))
        );

    const removeSkill = (i: number) =>
        setSkills((s) => s.filter((_, idx) => idx !== i));

    const addExp = () =>
        setExperience((e) => [
            ...e,
            {
                title: "",
                company: "",
                location: "",
                type: "Full-Time",
                period: "",
            },
        ]);

    const updateExp = (
        i: number,
        field: keyof ExperienceInput,
        value: string
    ) =>
        setExperience((e) =>
            e.map((ex, idx) => (idx === i ? { ...ex, [field]: value } : ex))
        );

    const removeExp = (i: number) =>
        setExperience((e) => e.filter((_, idx) => idx !== i));

    // ── Step 4: Generate ──
    const generate = async () => {
        setLoading(true);
        setError("");
        try {
            const selectedProjects = repos
                .filter((r) => selectedRepos.has(r.id))
                .map((r) => ({
                    name: r.name,
                    description: r.description || "",
                    url: r.html_url,
                    language: r.language,
                }));

            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    title,
                    bio,
                    openToWork,
                    skills,
                    projects: selectedProjects,
                    experience,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Generation failed");

            const portfolioData: PortfolioData = {
                name,
                title: data.title,
                bio: data.bio,
                openToWork,
                email,
                projects: data.projects.map(
                    (p: {
                        name: string;
                        description: string;
                        status: string;
                        location: string;
                    }) => ({
                        ...p,
                        url: repos.find((r) => r.name === p.name)?.html_url,
                    })
                ),
                skills: data.skills.map(
                    (s: {
                        name: string;
                        category: string;
                        years: string;
                        proficiency: number;
                        tier: string;
                    }) => ({
                        ...s,
                        image: `https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80`,
                    })
                ),
                experience,
            };

            setGenerated(portfolioData);
            setStep(4);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!generated) return;
        const html = generatePortfolioHTML(generated);
        downloadHTML(
            html,
            `${generated.name
                .toLowerCase()
                .replace(/\s+/g, "-")}-portfolio.html`
        );
    };

    // ─── RENDER ──────────────────────────────────────────────
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;700;800&display=swap"
                rel="stylesheet"
            />
            <style>{`
        input::placeholder, textarea::placeholder { color: #444; }
        input:focus, textarea:focus, select:focus { border-color: #444 !important; }
        select option { background: #111; color: #fff; }
        button:hover { opacity: 0.9; }
      `}</style>

            <div style={S.page}>
                {/* Header */}
                <header style={S.header}>
                    <a href="/" style={S.logo}>
                        <div style={S.logoIcon}>
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="#000"
                                strokeWidth="2.2"
                                width={14}
                                height={14}
                            >
                                <circle cx="8" cy="8" r="4.5" />
                                <circle
                                    cx="8"
                                    cy="8"
                                    r="1.4"
                                    fill="#000"
                                    stroke="none"
                                />
                            </svg>
                        </div>
                        mkfolio
                    </a>
                    <span style={{ fontSize: 12, color: "#444" }}>
                        Portfolio Generator
                    </span>
                </header>

                <div style={S.container}>
                    {/* Step indicator */}
                    <div style={S.stepIndicator}>
                        {([1, 2, 3, 4] as Step[]).map((s) => (
                            <div
                                key={s}
                                style={S.stepDot(step === s, step > s)}
                            />
                        ))}
                    </div>

                    {error && <div style={S.error}>{error}</div>}

                    {/* ── STEP 1: GitHub Username ── */}
                    {step === 1 && (
                        <div>
                            <p style={S.eyebrow}>Step 1 of 4</p>
                            <h1 style={S.heading}>
                                Enter your GitHub
                                <br />
                                username.
                            </h1>
                            <p style={S.sub}>
                                We&apos;ll pull your repos automatically so you
                                don&apos;t have to type everything from scratch.
                            </p>

                            <label style={S.label}>GitHub Username</label>
                            <input
                                style={S.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && fetchGitHub()
                                }
                                placeholder="e.g. torvalds"
                                autoFocus
                            />

                            <button
                                style={S.btnPrimary}
                                onClick={fetchGitHub}
                                disabled={loading || !username.trim()}
                            >
                                {loading ? "Fetching..." : "Fetch Repos"}
                                {!loading && (
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
                                )}
                            </button>
                        </div>
                    )}

                    {/* ── STEP 2: Pick Repos ── */}
                    {step === 2 && (
                        <div>
                            <p style={S.eyebrow}>Step 2 of 4</p>
                            <h1 style={S.heading}>
                                Pick your best
                                <br />
                                projects.
                            </h1>
                            <p style={S.sub}>
                                Select up to 6 repos to feature.
                                {githubUser?.name && (
                                    <>
                                        {" "}
                                        Showing repos for{" "}
                                        <strong style={{ color: "#fff" }}>
                                            {githubUser.name}
                                        </strong>
                                        .
                                    </>
                                )}
                            </p>

                            <div style={{ marginBottom: 32 }}>
                                {repos.map((repo) => {
                                    const selected = selectedRepos.has(repo.id);
                                    return (
                                        <div
                                            key={repo.id}
                                            style={S.repoCard(selected)}
                                            onClick={() => toggleRepo(repo.id)}
                                        >
                                            <div
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: 4,
                                                    border: `1.5px solid ${
                                                        selected
                                                            ? "#fff"
                                                            : "#3a3a3a"
                                                    }`,
                                                    background: selected
                                                        ? "#fff"
                                                        : "transparent",
                                                    flexShrink: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                {selected && (
                                                    <svg
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        stroke="#000"
                                                        strokeWidth="2.5"
                                                        width={10}
                                                        height={10}
                                                    >
                                                        <path d="M2 6l3 3 5-5" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div
                                                style={{ flex: 1, minWidth: 0 }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: 13,
                                                        color: "#fff",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    {repo.name}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 11,
                                                        color: "#666",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    {repo.description ||
                                                        "No description"}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: 12,
                                                    alignItems: "center",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {repo.language && (
                                                    <span
                                                        style={{
                                                            fontSize: 10,
                                                            color: "#666",
                                                            letterSpacing:
                                                                "0.1em",
                                                        }}
                                                    >
                                                        {repo.language}
                                                    </span>
                                                )}
                                                {repo.stars > 0 && (
                                                    <span
                                                        style={{
                                                            fontSize: 10,
                                                            color: "#666",
                                                        }}
                                                    >
                                                        ★ {repo.stars}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ display: "flex", gap: 12 }}>
                                <button
                                    style={S.btnSecondary}
                                    onClick={() => setStep(1)}
                                >
                                    ← Back
                                </button>
                                <button
                                    style={S.btnPrimary}
                                    onClick={() => setStep(3)}
                                    disabled={selectedRepos.size === 0}
                                >
                                    Continue ({selectedRepos.size} selected)
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
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 3: Personal Info ── */}
                    {step === 3 && (
                        <div>
                            <p style={S.eyebrow}>Step 3 of 4</p>
                            <h1 style={S.heading}>
                                Tell us about
                                <br />
                                yourself.
                            </h1>
                            <p style={S.sub}>
                                Don&apos;t overthink it - AI will sharpen
                                everything. Just give us the raw material.
                            </p>

                            {/* Basic info */}
                            <div style={S.row}>
                                <div style={{ flex: 1 }}>
                                    <label style={S.label}>Full Name</label>
                                    <input
                                        style={S.input}
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Alex Chen"
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={S.label}>Email</label>
                                    <input
                                        style={{ ...S.input, marginBottom: 0 }}
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="alex@example.com"
                                    />
                                </div>
                            </div>

                            <label style={S.label}>Job Title</label>
                            <input
                                style={S.input}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Frontend Developer"
                            />

                            <label style={S.label}>Bio</label>
                            <textarea
                                style={S.textarea}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Write anything - even bad copy works. AI will rewrite it."
                            />

                            {/* Open to work toggle */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    marginBottom: 32,
                                }}
                            >
                                <div
                                    style={S.toggle(openToWork)}
                                    onClick={() => setOpenToWork(!openToWork)}
                                >
                                    <div style={S.toggleDot(openToWork)} />
                                </div>
                                <span
                                    style={{
                                        fontSize: 13,
                                        color: openToWork ? "#fff" : "#666",
                                    }}
                                >
                                    Open to work
                                </span>
                            </div>

                            {/* Skills */}
                            <div style={{ marginBottom: 32 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 16,
                                    }}
                                >
                                    <label
                                        style={{ ...S.label, marginBottom: 0 }}
                                    >
                                        Skills
                                    </label>
                                    <button
                                        style={{
                                            ...S.btnSecondary,
                                            padding: "6px 14px",
                                            fontSize: 11,
                                        }}
                                        onClick={addSkill}
                                    >
                                        + Add
                                    </button>
                                </div>
                                {skills.map((sk, i) => (
                                    <div key={i} style={S.card}>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <input
                                                style={{
                                                    ...S.input,
                                                    marginBottom: 0,
                                                    flex: 2,
                                                }}
                                                value={sk.name}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        i,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="React"
                                            />
                                            <select
                                                style={
                                                    {
                                                        ...S.input,
                                                        marginBottom: 0,
                                                        flex: 1,
                                                    } as React.CSSProperties
                                                }
                                                value={sk.category}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        i,
                                                        "category",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {[
                                                    "Frontend",
                                                    "Backend",
                                                    "Language",
                                                    "DevOps",
                                                    "Design",
                                                    "Other",
                                                ].map((c) => (
                                                    <option key={c}>{c}</option>
                                                ))}
                                            </select>
                                            <input
                                                style={{
                                                    ...S.input,
                                                    marginBottom: 0,
                                                    width: 80,
                                                }}
                                                value={sk.years}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        i,
                                                        "years",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="2 yrs"
                                            />
                                            <button
                                                style={S.removeBtn}
                                                onClick={() => removeSkill(i)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div>
                                            <label
                                                style={{
                                                    ...S.label,
                                                    marginBottom: 6,
                                                }}
                                            >
                                                Proficiency: {sk.proficiency}%
                                            </label>
                                            <input
                                                type="range"
                                                min={10}
                                                max={100}
                                                step={5}
                                                value={sk.proficiency}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        i,
                                                        "proficiency",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                style={{
                                                    width: "100%",
                                                    accentColor: "#fff",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Experience */}
                            <div style={{ marginBottom: 40 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 16,
                                    }}
                                >
                                    <label
                                        style={{ ...S.label, marginBottom: 0 }}
                                    >
                                        Experience
                                    </label>
                                    <button
                                        style={{
                                            ...S.btnSecondary,
                                            padding: "6px 14px",
                                            fontSize: 11,
                                        }}
                                        onClick={addExp}
                                    >
                                        + Add
                                    </button>
                                </div>
                                {experience.map((ex, i) => (
                                    <div key={i} style={S.card}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                marginBottom: 8,
                                            }}
                                        >
                                            <button
                                                style={S.removeBtn}
                                                onClick={() => removeExp(i)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div style={S.row}>
                                            <input
                                                style={{
                                                    ...S.input,
                                                    marginBottom: 0,
                                                    flex: 1,
                                                }}
                                                value={ex.title}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Software Engineer"
                                            />
                                            <input
                                                style={{
                                                    ...S.input,
                                                    marginBottom: 0,
                                                    flex: 1,
                                                }}
                                                value={ex.company}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "company",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Acme Corp"
                                            />
                                        </div>
                                        <div
                                            style={{ ...S.row, marginTop: 10 }}
                                        >
                                            <input
                                                style={{
                                                    ...S.input,
                                                    marginBottom: 0,
                                                    flex: 1,
                                                }}
                                                value={ex.location}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "location",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Remote"
                                            />
                                            <input
                                                style={{
                                                    ...S.input,
                                                    marginBottom: 0,
                                                    flex: 1,
                                                }}
                                                value={ex.period}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "period",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="2022–Present"
                                            />
                                            <select
                                                style={
                                                    {
                                                        ...S.input,
                                                        marginBottom: 0,
                                                        flex: 1,
                                                    } as React.CSSProperties
                                                }
                                                value={ex.type}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {[
                                                    "Full-Time",
                                                    "Contract",
                                                    "Part-Time",
                                                    "Internship",
                                                    "Freelance",
                                                ].map((t) => (
                                                    <option key={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: "flex", gap: 12 }}>
                                <button
                                    style={S.btnSecondary}
                                    onClick={() => setStep(2)}
                                >
                                    ← Back
                                </button>
                                <button
                                    style={S.btnPrimary}
                                    onClick={generate}
                                    disabled={loading || !name.trim()}
                                >
                                    {loading
                                        ? "Generating with AI..."
                                        : "Generate Portfolio"}
                                    {!loading && (
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
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── STEP 4: Done ── */}
                    {step === 4 && generated && (
                        <div>
                            <p style={S.eyebrow}>Step 4 of 4</p>
                            <h1 style={S.heading}>
                                Your portfolio
                                <br />
                                is ready.
                            </h1>
                            <p style={S.sub}>
                                AI has rewritten your content. Download your
                                self-contained HTML file and host it anywhere.
                            </p>

                            <div style={S.successCard}>
                                <div style={{ fontSize: 40, marginBottom: 16 }}>
                                    ✦
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontSize: 22,
                                        fontWeight: 700,
                                        marginBottom: 8,
                                    }}
                                >
                                    {generated.name}
                                </div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        color: "#666",
                                        marginBottom: 8,
                                    }}
                                >
                                    {generated.title}
                                </div>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "#999",
                                        lineHeight: 1.7,
                                        maxWidth: 400,
                                        margin: "0 auto 28px",
                                    }}
                                >
                                    {generated.bio}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 8,
                                        justifyContent: "center",
                                        flexWrap: "wrap" as const,
                                        marginBottom: 28,
                                    }}
                                >
                                    {generated.projects.map((p) => (
                                        <span
                                            key={p.name}
                                            style={{
                                                fontSize: 11,
                                                border: "1px solid #2a2a2a",
                                                borderRadius: 999,
                                                padding: "4px 12px",
                                                color: "#666",
                                            }}
                                        >
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    style={{
                                        ...S.btnPrimary,
                                        margin: "0 auto",
                                    }}
                                    onClick={handleDownload}
                                >
                                    Download portfolio.html
                                    <svg
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        width={14}
                                        height={14}
                                    >
                                        <path d="M8 2v9M4 7l4 4 4-4M2 14h12" />
                                    </svg>
                                </button>
                            </div>

                            <div
                                style={{
                                    marginTop: 20,
                                    textAlign: "center" as const,
                                }}
                            >
                                <button
                                    style={{
                                        ...S.btnSecondary,
                                        margin: "0 auto",
                                    }}
                                    onClick={() => {
                                        setStep(1);
                                        setGenerated(null);
                                        setUsername("");
                                        setSelectedRepos(new Set());
                                    }}
                                >
                                    Generate another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
