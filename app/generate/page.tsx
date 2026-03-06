/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
    downloadHTML,
    generatePortfolioHTML,
    PortfolioData,
} from "../lib/export";

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

const LBL: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#444",
    display: "block",
    marginBottom: 10,
};

export default function GeneratePage() {
    const [step, setStep] = useState<Step>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [githubUser, setGithubUser] = useState<GithubUser | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");
    const [openToWork, setOpenToWork] = useState(true);
    const [email, setEmail] = useState("");
    const [faviconDataUrl, setFaviconDataUrl] = useState("");
    const [faviconPreview, setFaviconPreview] = useState("");
    const faviconRef = useRef<HTMLInputElement>(null);
    const [skills, setSkills] = useState<SkillInput[]>([
        { name: "", category: "Frontend", years: "1 yr", proficiency: 70 },
    ]);
    const [experience, setExperience] = useState<ExperienceInput[]>([
        { title: "", company: "", location: "", type: "Full-Time", period: "" },
    ]);
    const [generated, setGenerated] = useState<PortfolioData | null>(null);

    const handleFavicon = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const r = ev.target?.result as string;
            setFaviconDataUrl(r);
            setFaviconPreview(r);
        };
        reader.readAsDataURL(file);
    };
    const removeFavicon = () => {
        setFaviconDataUrl("");
        setFaviconPreview("");
        if (faviconRef.current) faviconRef.current.value = "";
    };

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

    const toggleRepo = (id: number) =>
        setSelectedRepos((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else if (next.size < 6) next.add(id);
            return next;
        });

    const addSkill = () =>
        setSkills((s) => [
            ...s,
            { name: "", category: "Frontend", years: "1 yr", proficiency: 70 },
        ]);
    const updateSkill = (i: number, f: keyof SkillInput, v: string | number) =>
        setSkills((s) =>
            s.map((sk, idx) => (idx === i ? { ...sk, [f]: v } : sk)),
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
    const updateExp = (i: number, f: keyof ExperienceInput, v: string) =>
        setExperience((e) =>
            e.map((ex, idx) => (idx === i ? { ...ex, [f]: v } : ex)),
        );
    const removeExp = (i: number) =>
        setExperience((e) => e.filter((_, idx) => idx !== i));

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
            setGenerated({
                name,
                title: data.title,
                bio: data.bio,
                openToWork,
                email,
                favicon: faviconDataUrl,
                projects: data.projects.map(
                    (p: {
                        name: string;
                        description: string;
                        status: string;
                        location: string;
                    }) => ({
                        ...p,
                        url: repos.find((r) => r.name === p.name)?.html_url,
                    }),
                ),
                skills: data.skills,
                experience,
            });
            setStep(4);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!generated) return;
        downloadHTML(
            generatePortfolioHTML(generated),
            `${generated.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.html`,
        );
    };

    const STEPS = ["GitHub", "Projects", "Details", "Download"];

    return (
        <>
            <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        body{background:#080808;color:#e8e3dc;font-family:'Outfit',sans-serif;overflow-x:hidden}
        ::selection{background:#e8e3dc;color:#080808}
        .grain{position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.032;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        .fade-up{animation:fadeUp .5s both}
        .gi{width:100%;background:#0d0d0d;border:1px solid #1c1c1c;border-radius:10px;padding:13px 16px;font-size:14px;color:#e8e3dc;font-family:'Outfit',sans-serif;outline:none;transition:border-color .2s;margin-bottom:16px;display:block}
        .gi:focus{border-color:#3a3a3a}
        .gi::placeholder{color:#2a2a2a}
        .gt{width:100%;background:#0d0d0d;border:1px solid #1c1c1c;border-radius:10px;padding:13px 16px;font-size:14px;color:#e8e3dc;font-family:'Outfit',sans-serif;outline:none;resize:vertical;min-height:100px;margin-bottom:16px;display:block;transition:border-color .2s}
        .gt:focus{border-color:#3a3a3a}
        .gt::placeholder{color:#2a2a2a}
        .gs{background:#0d0d0d;border:1px solid #1c1c1c;border-radius:10px;padding:13px 16px;font-size:14px;color:#e8e3dc;font-family:'Outfit',sans-serif;outline:none;cursor:pointer;transition:border-color .2s}
        .gs:focus{border-color:#3a3a3a}
        .gs option{background:#0d0d0d}
        .bp{display:inline-flex;align-items:center;gap:10px;background:#e8e3dc;color:#080808;border:none;border-radius:999px;padding:14px 28px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;font-family:'Outfit',sans-serif;transition:background .2s,transform .2s;white-space:nowrap}
        .bp:hover{background:#fff;transform:translateY(-1px)}
        .bp:disabled{opacity:.4;cursor:not-allowed;transform:none}
        .bg{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#555;border:1px solid #1c1c1c;border-radius:999px;padding:13px 24px;font-size:13px;cursor:pointer;font-family:'Outfit',sans-serif;transition:border-color .2s,color .2s;white-space:nowrap}
        .bg:hover{border-color:#3a3a3a;color:#e8e3dc}
        .bsm{display:inline-flex;align-items:center;gap:6px;background:transparent;color:#555;border:1px solid #1c1c1c;border-radius:999px;padding:7px 14px;font-size:11px;cursor:pointer;font-family:'Outfit',sans-serif;letter-spacing:.05em;transition:border-color .2s,color .2s;white-space:nowrap}
        .bsm:hover{border-color:#3a3a3a;color:#e8e3dc}
        .rc{background:#0d0d0d;border:1px solid #1c1c1c;border-radius:12px;padding:14px 16px;cursor:pointer;transition:border-color .2s,background .2s;margin-bottom:6px;display:flex;align-items:center;gap:12px}
        .rc:hover{border-color:#2a2a2a;background:#111}
        .rc.sel{border-color:#e8e3dc;background:#111}
        .sc{background:#0d0d0d;border:1px solid #1c1c1c;border-radius:12px;padding:18px;margin-bottom:6px}
        .rb{background:none;border:none;color:#2a2a2a;cursor:pointer;font-size:20px;line-height:1;padding:0 4px;transition:color .2s;font-family:monospace;flex-shrink:0}
        .rb:hover{color:#e8e3dc}
        .tt{width:44px;height:24px;border-radius:999px;position:relative;cursor:pointer;transition:background .25s;flex-shrink:0;border:1px solid #2a2a2a}
        .td{position:absolute;top:3px;width:16px;height:16px;border-radius:50%;transition:left .25s,background .25s}
        .fd{border:1px dashed #2a2a2a;border-radius:12px;padding:24px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;background:#0d0d0d}
        .fd:hover{border-color:#3a3a3a;background:#111}
        input[type=range]{accent-color:#e8e3dc}
        input[type=file]{display:none}
        @media(max-width:768px){
          .nav-steps{display:none!important}
          .two-col{grid-template-columns:1fr!important}
          .three-col{grid-template-columns:1fr 1fr!important}
          .si{flex-wrap:wrap}
          .si .gs{flex:1!important;min-width:0}
          .si .yrs{width:100%!important}
        }
        @media(max-width:480px){
          .three-col{grid-template-columns:1fr!important}
          .brow{flex-direction:column}
          .bp,.bg{width:100%;justify-content:center}
        }
      `}</style>

            <div className="grain" />

            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 24px",
                    borderBottom: "1px solid #111",
                    background: "rgba(8,8,8,0.92)",
                    backdropFilter: "blur(20px)",
                    gap: 12,
                }}
            >
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        textDecoration: "none",
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background: "#e8e3dc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="#080808"
                            strokeWidth="2.4"
                            width={12}
                            height={12}
                        >
                            <circle cx="7" cy="7" r="3.5" />
                            <circle
                                cx="7"
                                cy="7"
                                r="1"
                                fill="#080808"
                                stroke="none"
                            />
                        </svg>
                    </div>
                    <span
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 17,
                            color: "#e8e3dc",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        mkfolio
                    </span>
                </Link>

                <div
                    className="nav-steps"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                    {STEPS.map((label, i) => {
                        const s = (i + 1) as Step;
                        const done = step > s;
                        const active = step === s;
                        return (
                            <div
                                key={label}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: "50%",
                                            background: done
                                                ? "#e8e3dc"
                                                : active
                                                  ? "rgba(232,227,220,0.15)"
                                                  : "transparent",
                                            border: `1px solid ${done || active ? "#e8e3dc" : "#2a2a2a"}`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.3s",
                                        }}
                                    >
                                        {done ? (
                                            <svg
                                                viewBox="0 0 10 10"
                                                fill="none"
                                                stroke="#080808"
                                                strokeWidth="2.2"
                                                width={8}
                                                height={8}
                                            >
                                                <path d="M2 5l2 2 4-4" />
                                            </svg>
                                        ) : (
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'DM Mono', monospace",
                                                    fontSize: 8,
                                                    color: active
                                                        ? "#e8e3dc"
                                                        : "#333",
                                                }}
                                            >
                                                {i + 1}
                                            </span>
                                        )}
                                    </div>
                                    <span
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            color: active
                                                ? "#e8e3dc"
                                                : done
                                                  ? "#444"
                                                  : "#222",
                                            transition: "color 0.3s",
                                        }}
                                    >
                                        {label}
                                    </span>
                                </div>
                                {i < 3 && (
                                    <div
                                        style={{
                                            width: 16,
                                            height: 1,
                                            background: done
                                                ? "#2a2a2a"
                                                : "#161616",
                                            marginLeft: 4,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <span
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        color: "#333",
                        letterSpacing: "0.1em",
                        flexShrink: 0,
                    }}
                >
                    {step} / 4
                </span>
            </nav>

            <main
                style={{
                    minHeight: "100vh",
                    paddingTop: 88,
                    paddingBottom: 80,
                }}
            >
                <div
                    style={{
                        maxWidth: 640,
                        margin: "0 auto",
                        padding: "40px 20px 0",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            pointerEvents: "none",
                            zIndex: 0,
                            background:
                                "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.007) 79px,rgba(255,255,255,0.007) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.007) 79px,rgba(255,255,255,0.007) 80px)",
                        }}
                    />

                    {error && (
                        <div
                            style={{
                                background: "rgba(239,68,68,0.08)",
                                border: "1px solid rgba(239,68,68,0.2)",
                                borderRadius: 10,
                                padding: "12px 16px",
                                fontSize: 13,
                                color: "#f87171",
                                marginBottom: 24,
                                fontFamily: "'DM Mono', monospace",
                                letterSpacing: "0.04em",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="fade-up">
                            <p style={{ ...LBL, marginBottom: 16 }}>
                                Step 01 - Connect
                            </p>
                            <h1
                                style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: "clamp(36px,8vw,68px)",
                                    lineHeight: 0.95,
                                    letterSpacing: "-0.02em",
                                    color: "#e8e3dc",
                                    marginBottom: 20,
                                }}
                            >
                                Enter your
                                <br />
                                GitHub username.
                            </h1>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#555",
                                    lineHeight: 1.75,
                                    marginBottom: 40,
                                    maxWidth: 460,
                                }}
                            >
                                We'll fetch your repos, stars, and languages
                                automatically. No manual entry.
                            </p>
                            <label style={LBL}>GitHub Username</label>
                            <input
                                className="gi"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && fetchGitHub()
                                }
                                placeholder="e.g. torvalds"
                                autoFocus
                                style={{ fontSize: 18, padding: "16px 20px" }}
                            />
                            <button
                                className="bp"
                                onClick={fetchGitHub}
                                disabled={loading || !username.trim()}
                            >
                                {loading ? "Fetching repos..." : "Fetch Repos"}
                                {!loading && (
                                    <svg
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        width={13}
                                        height={13}
                                    >
                                        <path d="M2 7h10M7 2l5 5-5 5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="fade-up">
                            <p style={{ ...LBL, marginBottom: 16 }}>
                                Step 02 - Projects
                            </p>
                            <h1
                                style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: "clamp(36px,8vw,68px)",
                                    lineHeight: 0.95,
                                    letterSpacing: "-0.02em",
                                    color: "#e8e3dc",
                                    marginBottom: 20,
                                }}
                            >
                                Pick your best
                                <br />
                                projects.
                            </h1>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#555",
                                    lineHeight: 1.75,
                                    marginBottom: 32,
                                }}
                            >
                                Select up to 6 repos to feature.
                                {githubUser?.name && (
                                    <>
                                        {" "}
                                        Showing repos for{" "}
                                        <strong
                                            style={{
                                                color: "#e8e3dc",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {githubUser.name}
                                        </strong>
                                        .
                                    </>
                                )}
                            </p>
                            <div style={{ marginBottom: 32 }}>
                                {repos.map((repo) => {
                                    const sel = selectedRepos.has(repo.id);
                                    return (
                                        <div
                                            key={repo.id}
                                            className={`rc${sel ? " sel" : ""}`}
                                            onClick={() => toggleRepo(repo.id)}
                                        >
                                            <div
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: 4,
                                                    border: `1.5px solid ${sel ? "#e8e3dc" : "#2a2a2a"}`,
                                                    background: sel
                                                        ? "#e8e3dc"
                                                        : "transparent",
                                                    flexShrink: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                {sel && (
                                                    <svg
                                                        viewBox="0 0 10 10"
                                                        fill="none"
                                                        stroke="#080808"
                                                        strokeWidth="2.5"
                                                        width={8}
                                                        height={8}
                                                    >
                                                        <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div
                                                style={{ flex: 1, minWidth: 0 }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 500,
                                                        fontSize: 14,
                                                        color: "#e8e3dc",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    {repo.name}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                        color: "#444",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {repo.description ||
                                                        "No description"}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: 10,
                                                    alignItems: "center",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {repo.language && (
                                                    <span
                                                        style={{
                                                            fontFamily:
                                                                "'DM Mono', monospace",
                                                            fontSize: 10,
                                                            color: "#444",
                                                            letterSpacing:
                                                                "0.08em",
                                                        }}
                                                    >
                                                        {repo.language}
                                                    </span>
                                                )}
                                                {repo.stars > 0 && (
                                                    <span
                                                        style={{
                                                            fontFamily:
                                                                "'DM Mono', monospace",
                                                            fontSize: 10,
                                                            color: "#333",
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
                            <div
                                className="brow"
                                style={{ display: "flex", gap: 10 }}
                            >
                                <button
                                    className="bg"
                                    onClick={() => setStep(1)}
                                >
                                    ← Back
                                </button>
                                <button
                                    className="bp"
                                    onClick={() => setStep(3)}
                                    disabled={selectedRepos.size === 0}
                                >
                                    Continue - {selectedRepos.size} selected
                                    <svg
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        width={13}
                                        height={13}
                                    >
                                        <path d="M2 7h10M7 2l5 5-5 5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="fade-up">
                            <p style={{ ...LBL, marginBottom: 16 }}>
                                Step 03 - Details
                            </p>
                            <h1
                                style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: "clamp(36px,8vw,68px)",
                                    lineHeight: 0.95,
                                    letterSpacing: "-0.02em",
                                    color: "#e8e3dc",
                                    marginBottom: 20,
                                }}
                            >
                                Tell us about
                                <br />
                                yourself.
                            </h1>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#555",
                                    lineHeight: 1.75,
                                    marginBottom: 40,
                                }}
                            >
                                Don't overthink it - we will sharpen everything.
                                Just give us the raw material.
                            </p>

                            <div
                                className="two-col"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12,
                                }}
                            >
                                <div>
                                    <label style={LBL}>Full Name</label>
                                    <input
                                        className="gi"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Alex Chen"
                                    />
                                </div>
                                <div>
                                    <label style={LBL}>Email</label>
                                    <input
                                        className="gi"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="alex@example.com"
                                    />
                                </div>
                            </div>

                            <label style={LBL}>Job Title</label>
                            <input
                                className="gi"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Frontend Developer"
                            />

                            <label style={LBL}>Bio</label>
                            <textarea
                                className="gt"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Write anything - even rough copy works. We will rewrite it."
                            />

                            <div style={{ marginBottom: 24 }}>
                                <label style={LBL}>
                                    Favicon{" "}
                                    <span
                                        style={{
                                            color: "#2a2a2a",
                                            letterSpacing: 0,
                                            textTransform: "none",
                                            fontFamily: "'Outfit',sans-serif",
                                            fontSize: 11,
                                        }}
                                    >
                                        - optional
                                    </span>
                                </label>
                                {faviconPreview ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                            background: "#0d0d0d",
                                            border: "1px solid #1c1c1c",
                                            borderRadius: 12,
                                            padding: "14px 18px",
                                        }}
                                    >
                                        <img
                                            src={faviconPreview}
                                            alt="favicon"
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 6,
                                                objectFit: "contain",
                                                background: "#161616",
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    color: "#e8e3dc",
                                                    marginBottom: 2,
                                                }}
                                            >
                                                Custom favicon uploaded
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily:
                                                        "'DM Mono',monospace",
                                                    fontSize: 10,
                                                    color: "#333",
                                                    letterSpacing: "0.08em",
                                                }}
                                            >
                                                Will appear in the browser tab
                                            </div>
                                        </div>
                                        <button
                                            className="bsm"
                                            onClick={removeFavicon}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="fd"
                                        onClick={() =>
                                            faviconRef.current?.click()
                                        }
                                    >
                                        <div
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 8,
                                                background: "#161616",
                                                border: "1px solid #2a2a2a",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                margin: "0 auto 12px",
                                            }}
                                        >
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="#444"
                                                strokeWidth="1.5"
                                                width={16}
                                                height={16}
                                            >
                                                <path d="M8 2v8M4 6l4-4 4 4M2 14h12" />
                                            </svg>
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                color: "#555",
                                                marginBottom: 4,
                                            }}
                                        >
                                            Click to upload favicon
                                        </div>
                                        <div
                                            style={{
                                                fontFamily:
                                                    "'DM Mono',monospace",
                                                fontSize: 10,
                                                color: "#2a2a2a",
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            PNG · ICO · SVG · 32×32 recommended
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={faviconRef}
                                    type="file"
                                    accept="image/png,image/x-icon,image/svg+xml,image/jpeg,image/webp"
                                    onChange={handleFavicon}
                                />
                                <p
                                    style={{
                                        fontFamily: "'DM Mono',monospace",
                                        fontSize: 10,
                                        color: "#2a2a2a",
                                        letterSpacing: "0.08em",
                                        marginTop: 8,
                                    }}
                                >
                                    Leave empty to use the default mkfolio
                                    favicon.
                                </p>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    marginBottom: 36,
                                    padding: "16px 18px",
                                    background: "#0d0d0d",
                                    border: "1px solid #1c1c1c",
                                    borderRadius: 12,
                                }}
                            >
                                <div
                                    className="tt"
                                    style={{
                                        background: openToWork
                                            ? "#e8e3dc"
                                            : "transparent",
                                    }}
                                    onClick={() => setOpenToWork(!openToWork)}
                                >
                                    <div
                                        className="td"
                                        style={{
                                            left: openToWork ? 22 : 4,
                                            background: openToWork
                                                ? "#080808"
                                                : "#2a2a2a",
                                        }}
                                    />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            color: openToWork
                                                ? "#e8e3dc"
                                                : "#555",
                                            fontWeight: 500,
                                            marginBottom: 2,
                                        }}
                                    >
                                        Open to work
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "'DM Mono',monospace",
                                            fontSize: 10,
                                            color: "#2a2a2a",
                                            letterSpacing: "0.08em",
                                        }}
                                    >
                                        Shows a green badge on your portfolio
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 36 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 14,
                                    }}
                                >
                                    <label style={{ ...LBL, marginBottom: 0 }}>
                                        Skills
                                    </label>
                                    <button className="bsm" onClick={addSkill}>
                                        + Add skill
                                    </button>
                                </div>
                                {skills.map((sk, i) => (
                                    <div key={i} className="sc">
                                        <div
                                            className="si"
                                            style={{
                                                display: "flex",
                                                gap: 8,
                                                marginBottom: 12,
                                                alignItems: "center",
                                            }}
                                        >
                                            <input
                                                className="gi"
                                                style={{
                                                    flex: 2,
                                                    marginBottom: 0,
                                                    minWidth: 0,
                                                }}
                                                value={sk.name}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        i,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="React"
                                            />
                                            <select
                                                className="gs"
                                                style={{ flex: 1, minWidth: 0 }}
                                                value={sk.category}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        i,
                                                        "category",
                                                        e.target.value,
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
                                                className="gi yrs"
                                                style={{
                                                    width: 80,
                                                    marginBottom: 0,
                                                    flexShrink: 0,
                                                }}
                                                value={sk.years}
                                                onChange={(e) =>
                                                    updateSkill(
                                                        i,
                                                        "years",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="2 yrs"
                                            />
                                            <button
                                                className="rb"
                                                onClick={() => removeSkill(i)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: 8,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'DM Mono',monospace",
                                                    fontSize: 10,
                                                    letterSpacing: "0.12em",
                                                    textTransform: "uppercase",
                                                    color: "#333",
                                                }}
                                            >
                                                Proficiency
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'DM Mono',monospace",
                                                    fontSize: 10,
                                                    color: "#555",
                                                }}
                                            >
                                                {sk.proficiency}%
                                            </span>
                                        </div>
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
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginBottom: 44 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 14,
                                    }}
                                >
                                    <label style={{ ...LBL, marginBottom: 0 }}>
                                        Experience
                                    </label>
                                    <button className="bsm" onClick={addExp}>
                                        + Add role
                                    </button>
                                </div>
                                {experience.map((ex, i) => (
                                    <div key={i} className="sc">
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                marginBottom: 8,
                                            }}
                                        >
                                            <button
                                                className="rb"
                                                onClick={() => removeExp(i)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div
                                            className="two-col"
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <input
                                                className="gi"
                                                style={{ marginBottom: 0 }}
                                                value={ex.title}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "title",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Software Engineer"
                                            />
                                            <input
                                                className="gi"
                                                style={{ marginBottom: 0 }}
                                                value={ex.company}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "company",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Acme Corp"
                                            />
                                        </div>
                                        <div
                                            className="three-col"
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "1fr 1fr 1fr",
                                                gap: 8,
                                            }}
                                        >
                                            <input
                                                className="gi"
                                                style={{ marginBottom: 0 }}
                                                value={ex.location}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "location",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Remote"
                                            />
                                            <input
                                                className="gi"
                                                style={{ marginBottom: 0 }}
                                                value={ex.period}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "period",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="2022–Present"
                                            />
                                            <select
                                                className="gs"
                                                style={{ width: "100%" }}
                                                value={ex.type}
                                                onChange={(e) =>
                                                    updateExp(
                                                        i,
                                                        "type",
                                                        e.target.value,
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

                            <div
                                className="brow"
                                style={{ display: "flex", gap: 10 }}
                            >
                                <button
                                    className="bg"
                                    onClick={() => setStep(2)}
                                >
                                    ← Back
                                </button>
                                <button
                                    className="bp"
                                    onClick={generate}
                                    disabled={loading || !name.trim()}
                                >
                                    {loading
                                        ? "Generating with AI..."
                                        : "Generate Portfolio"}
                                    {!loading && (
                                        <svg
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.2"
                                            width={13}
                                            height={13}
                                        >
                                            <path d="M2 7h10M7 2l5 5-5 5" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && generated && (
                        <div className="fade-up">
                            <p style={{ ...LBL, marginBottom: 16 }}>
                                Step 04 - Done
                            </p>
                            <h1
                                style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: "clamp(36px,8vw,68px)",
                                    lineHeight: 0.95,
                                    letterSpacing: "-0.02em",
                                    color: "#e8e3dc",
                                    marginBottom: 20,
                                }}
                            >
                                Your portfolio
                                <br />
                                is ready.
                            </h1>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#555",
                                    lineHeight: 1.75,
                                    marginBottom: 40,
                                }}
                            >
                                We have rewritten your content. Download and
                                host it anywhere in minutes.
                            </p>

                            <div
                                style={{
                                    background: "#0d0d0d",
                                    border: "1px solid #1c1c1c",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        padding: "10px 14px",
                                        borderBottom: "1px solid #1c1c1c",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    {["#ff5f57", "#febc2e", "#28c840"].map(
                                        (c) => (
                                            <div
                                                key={c}
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: c,
                                                    opacity: 0.7,
                                                }}
                                            />
                                        ),
                                    )}
                                    {generated.favicon && (
                                        <img
                                            src={generated.favicon}
                                            alt="favicon"
                                            style={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: 2,
                                                objectFit: "contain",
                                                marginLeft: 4,
                                            }}
                                        />
                                    )}
                                    <div
                                        style={{
                                            flex: 1,
                                            margin: "0 10px",
                                            background: "#161616",
                                            borderRadius: 5,
                                            padding: "4px 10px",
                                            fontFamily: "'DM Mono',monospace",
                                            fontSize: 10,
                                            color: "#333",
                                        }}
                                    >
                                        {generated.name
                                            .toLowerCase()
                                            .replace(/\s+/g, "")}
                                        .vercel.app
                                    </div>
                                </div>
                                <div
                                    style={{
                                        padding: "28px 24px",
                                        background: "#080808",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.01) 39px,rgba(255,255,255,0.01) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.01) 39px,rgba(255,255,255,0.01) 40px)",
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <p
                                        style={{
                                            fontFamily: "'DM Mono',monospace",
                                            fontSize: 9,
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            color: "rgba(255,255,255,0.2)",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {generated.title}
                                    </p>
                                    <div
                                        style={{
                                            fontFamily:
                                                "'DM Serif Display',serif",
                                            fontSize: "clamp(28px,6vw,52px)",
                                            color: "#e8e3dc",
                                            lineHeight: 0.9,
                                            letterSpacing: "-0.02em",
                                            marginBottom: 16,
                                        }}
                                    >
                                        {generated.name
                                            .split(" ")[0]
                                            .toUpperCase()}
                                        {generated.name.split(" ")[1] && (
                                            <>
                                                <br />
                                                <span
                                                    style={{
                                                        paddingLeft:
                                                            "clamp(12px,2.5vw,28px)",
                                                        color: "rgba(255,255,255,0.18)",
                                                    }}
                                                >
                                                    {generated.name
                                                        .split(" ")
                                                        .slice(1)
                                                        .join(" ")
                                                        .toUpperCase()}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: "#555",
                                            lineHeight: 1.65,
                                            maxWidth: 340,
                                            marginBottom: 16,
                                        }}
                                    >
                                        {generated.bio}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 6,
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {generated.skills
                                            .slice(0, 4)
                                            .map((s) => (
                                                <span
                                                    key={s.name}
                                                    style={{
                                                        fontFamily:
                                                            "'DM Mono',monospace",
                                                        fontSize: 9,
                                                        letterSpacing: "0.1em",
                                                        border: "1px solid #1c1c1c",
                                                        borderRadius: 999,
                                                        padding: "4px 10px",
                                                        color: "#444",
                                                    }}
                                                >
                                                    {s.name} · {s.tier}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 6,
                                    flexWrap: "wrap",
                                    marginBottom: 28,
                                }}
                            >
                                {generated.projects.map((p) => (
                                    <span
                                        key={p.name}
                                        style={{
                                            fontFamily: "'DM Mono',monospace",
                                            fontSize: 10,
                                            letterSpacing: "0.08em",
                                            border: "1px solid #1c1c1c",
                                            borderRadius: 999,
                                            padding: "5px 12px",
                                            color: "#444",
                                        }}
                                    >
                                        {p.name}
                                    </span>
                                ))}
                            </div>

                            <div
                                className="brow"
                                style={{ display: "flex", gap: 10 }}
                            >
                                <button className="bp" onClick={handleDownload}>
                                    Download portfolio.html
                                    <svg
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        width={13}
                                        height={13}
                                    >
                                        <path d="M7 1v8M3 6l4 4 4-4M1 12h12" />
                                    </svg>
                                </button>
                                <button
                                    className="bg"
                                    onClick={() => {
                                        setStep(1);
                                        setGenerated(null);
                                        setUsername("");
                                        setSelectedRepos(new Set());
                                        removeFavicon();
                                    }}
                                >
                                    Generate another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
