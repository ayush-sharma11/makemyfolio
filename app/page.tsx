/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { TEMPLATES } from "../app/templates";

const STEPS = [
    {
        num: "01",
        label: "Connect GitHub",
        desc: "Paste your username. We fetch your repos, stars, and languages automatically.",
    },
    {
        num: "02",
        label: "Pick & Fill",
        desc: "Choose which projects to feature. Add your bio, skills, and experience - rough is fine.",
    },
    {
        num: "03",
        label: "AI Rewrites",
        desc: "We sharpen every word. No clichés, no filler. Just copy that sounds like you, but better.",
    },
    {
        num: "04",
        label: "Download",
        desc: "One self-contained HTML file. Host on GitHub Pages, Vercel, or Netlify in minutes.",
    },
];

const FEATURES = [
    {
        icon: "◈",
        title: "GitHub Import",
        desc: "Repos pulled automatically. No copy-pasting project names.",
    },
    {
        icon: "◎",
        title: "AI Copywriting",
        desc: "We rewrite your bio and descriptions into sharp, minimal copy.",
    },
    {
        icon: "▣",
        title: "Zero Lock-in",
        desc: "You get a plain HTML file. No accounts, no subscriptions, no platforms.",
    },
    {
        icon: "◐",
        title: "Dark by Default",
        desc: "Architectural template designed to make your work look expensive.",
    },
    {
        icon: "◇",
        title: "Tier System",
        desc: "Skills ranked S/A/B with animated proficiency bars. Shows depth at a glance.",
    },
    {
        icon: "○",
        title: "One Click Deploy",
        desc: "Drop the file on Vercel, Netlify or GitHub Pages. Live in under a minute.",
    },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return visible;
}

function LoggedInPage({
    session,
}: {
    session: { user: { name?: string | null; login?: string } };
}) {
    const login =
        (session.user as { login?: string }).login ??
        session.user.name ??
        "there";
    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <>
            <style>{`
                @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
                @keyframes pulse { 0%,100% { opacity:0.4 } 50% { opacity:1 } }
                .grain { position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.032;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E") }
                .fade-up { animation: fadeUp 0.5s both }
                .tpl-preview-card { border:1.5px solid #1c1c1c; border-radius:14px; overflow:hidden; background:#0d0d0d; transition:border-color .2s, transform .2s; cursor:pointer; text-decoration:none; display:block }
                .tpl-preview-card:hover { border-color:#3a3a3a; transform:translateY(-3px) }
                @media(max-width:600px) { .tpl-grid-2 { grid-template-columns:1fr !important } }
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
                    padding: "18px 24px",
                    borderBottom: "1px solid #111",
                    background: "rgba(8,8,8,0.88)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <span
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 18,
                        color: "#e8e3dc",
                        letterSpacing: "-0.01em",
                    }}
                >
                    makemyfolio
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <Link
                        href="/about"
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: "#555",
                            textDecoration: "none",
                            letterSpacing: "0.1em",
                            transition: "color .2s",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#e8e3dc")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "#555")
                        }
                    >
                        About
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            color: "#444",
                            background: "none",
                            border: "1px solid #1c1c1c",
                            borderRadius: 999,
                            padding: "8px 16px",
                            cursor: "pointer",
                            letterSpacing: "0.08em",
                            transition: "color .2s, border-color .2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#e8e3dc";
                            e.currentTarget.style.borderColor = "#3a3a3a";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#444";
                            e.currentTarget.style.borderColor = "#1c1c1c";
                        }}
                    >
                        Sign out
                    </button>
                </div>
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
                        maxWidth: 860,
                        margin: "0 auto",
                        padding: "48px 24px 0",
                    }}
                >
                    {/* Greeting */}
                    <div className="fade-up" style={{ marginBottom: 48 }}>
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#444",
                                marginBottom: 14,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: "#e8e3dc",
                                    display: "inline-block",
                                    animation: "pulse 2s ease-in-out infinite",
                                }}
                            />
                            {greeting()}, {login}
                        </p>
                        <h1
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "clamp(40px, 8vw, 80px)",
                                lineHeight: 0.95,
                                letterSpacing: "-0.02em",
                                color: "#e8e3dc",
                                marginBottom: 20,
                            }}
                        >
                            Pick a template,
                            <br />
                            <span style={{ color: "#333" }}>ship today.</span>
                        </h1>
                        <p
                            style={{
                                fontSize: 15,
                                color: "#555",
                                lineHeight: 1.75,
                                maxWidth: 460,
                            }}
                        >
                            Choose a template below and we'll pull your GitHub
                            repos, rewrite your copy with AI, and hand you a
                            single HTML file.
                        </p>
                    </div>

                    {/* Template previews */}
                    <div
                        className="fade-up"
                        style={{ animationDelay: "0.1s", marginBottom: 48 }}
                    >
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#444",
                                marginBottom: 20,
                            }}
                        >
                            {TEMPLATES.length} template
                            {TEMPLATES.length !== 1 ? "s" : ""} available
                        </p>
                        <div
                            className="tpl-grid-2"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 12,
                            }}
                        >
                            {TEMPLATES.map((tpl) => (
                                <Link
                                    key={tpl.id}
                                    href="/generate"
                                    className="tpl-preview-card"
                                >
                                    {/* Thumbnail */}
                                    <div
                                        style={{
                                            width: "100%",
                                            aspectRatio: "16/10",
                                            overflow: "hidden",
                                            background: "#080808",
                                            lineHeight: 0,
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: tpl.preview,
                                        }}
                                    />
                                    {/* Info */}
                                    <div
                                        style={{
                                            padding: "18px 20px 20px",
                                            borderTop: "1px solid #161616",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginBottom: 6,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'DM Serif Display', serif",
                                                    fontSize: 18,
                                                    color: "#e8e3dc",
                                                }}
                                            >
                                                {tpl.name}
                                            </span>
                                            <svg
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                stroke="#444"
                                                strokeWidth="2"
                                                width={12}
                                                height={12}
                                            >
                                                <path d="M2 7h10M7 2l5 5-5 5" />
                                            </svg>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: 12,
                                                color: "#555",
                                                lineHeight: 1.6,
                                                marginBottom: 12,
                                            }}
                                        >
                                            {tpl.description}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: 6,
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {tpl.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    style={{
                                                        fontFamily:
                                                            "'DM Mono', monospace",
                                                        fontSize: 9,
                                                        letterSpacing: "0.08em",
                                                        color: "#444",
                                                        border: "1px solid #1c1c1c",
                                                        borderRadius: 999,
                                                        padding: "2px 8px",
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Main CTA */}
                    <div className="fade-up" style={{ animationDelay: "0.2s" }}>
                        <Link
                            href="/generate"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "#e8e3dc",
                                borderRadius: 14,
                                padding: "24px 28px",
                                textDecoration: "none",
                                transition: "background .2s, transform .2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#fff";
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#e8e3dc";
                                e.currentTarget.style.transform = "none";
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: 22,
                                        color: "#080808",
                                        marginBottom: 3,
                                    }}
                                >
                                    Start generating
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 11,
                                        color: "rgba(8,8,8,0.4)",
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    GitHub repos → AI copy → downloadable HTML
                                </div>
                            </div>
                            <svg
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="#080808"
                                strokeWidth="2.2"
                                width={20}
                                height={20}
                            >
                                <path d="M2 7h10M7 2l5 5-5 5" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>

            <footer
                style={{ borderTop: "1px solid #111", padding: "32px 40px" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        maxWidth: 860,
                        margin: "0 auto",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 15,
                            color: "#e8e3dc",
                        }}
                    >
                        makemyfolio
                    </span>
                    <p
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: "#333",
                            letterSpacing: "0.1em",
                        }}
                    >
                        © {new Date().getFullYear()} makemyfolio
                    </p>
                </div>
            </footer>
        </>
    );
}

export default function LandingPage() {
    const { data: session } = useSession();

    const stepsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    const stepsVisible = useInView(stepsRef);
    const featuresVisible = useInView(featuresRef);
    const ctaVisible = useInView(ctaRef);

    const tickerItems = [
        "GitHub Import",
        "AI Rewriting",
        "Professional Templates",
        "HTML Export",
    ];

    if (session?.user) {
        return (
            <LoggedInPage
                session={
                    session as {
                        user: { name?: string | null; login?: string };
                    }
                }
            />
        );
    }

    return (
        <>
            <style>{`
                .grain{position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.032;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")}
                .nav-link{font-family:'DM Mono',monospace;font-size:11px;color:#555;text-decoration:none;letter-spacing:.1em;transition:color .2s}
                .nav-link:hover{color:#e8e3dc}
                .btn-primary{display:inline-flex;align-items:center;gap:8px;background:#e8e3dc;color:#080808;border:none;border-radius:999px;padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;font-family:'Outfit',sans-serif;transition:background .2s,transform .2s;white-space:nowrap}
                .btn-primary:hover{background:#fff;transform:translateY(-1px)}
                .btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#555;border:1px solid #1c1c1c;border-radius:999px;padding:12px 24px;font-size:13px;cursor:pointer;font-family:'Outfit',sans-serif;transition:border-color .2s,color .2s;text-decoration:none}
                .btn-ghost:hover{border-color:#3a3a3a;color:#e8e3dc}
                .ticker-wrap{overflow:hidden;border-top:1px solid #111;border-bottom:1px solid #111;padding:12px 0;background:#0a0a0a}
                .ticker-track{display:flex;width:max-content;animation:ticker 18s linear infinite}
                @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
                .ticker-item{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#333;white-space:nowrap;padding:0 32px}
                .ticker-dot{display:inline-block;width:3px;height:3px;border-radius:50%;background:#2a2a2a;margin-left:32px;vertical-align:middle}
                .step-card{opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
                .step-card.visible{opacity:1;transform:none}
                .feature-card{opacity:0;transform:translateY(12px);transition:opacity .4s,transform .4s}
                .feature-card.visible{opacity:1;transform:none}
                .cta-section{opacity:0;transform:translateY(20px);transition:opacity .6s,transform .6s}
                .cta-section.visible{opacity:1;transform:none}
                @media(max-width:768px){.nav-links-desktop{display:none!important}.steps-grid{grid-template-columns:1fr 1fr!important}.features-grid{grid-template-columns:1fr 1fr!important}}
                @media(max-width:480px){.steps-grid{grid-template-columns:1fr!important}.features-grid{grid-template-columns:1fr!important}.hero-cta-row{flex-direction:column}.hero-cta-row .btn-primary,.hero-cta-row .btn-ghost{width:100%;justify-content:center}.hero-badge{gap:16px!important}}
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
                    padding: "18px 24px",
                    borderBottom: "1px solid #111",
                    background: "rgba(8,8,8,0.88)",
                    backdropFilter: "blur(20px)",
                    gap: 16,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 18,
                            color: "#e8e3dc",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        makemyfolio
                    </span>
                </div>

                <div
                    className="nav-links-desktop"
                    style={{
                        display: "flex",
                        gap: 32,
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <a href="#how" className="nav-link">
                        How it works
                    </a>
                    <a href="#features" className="nav-link">
                        Features
                    </a>
                    <Link href="/about" className="nav-link">
                        About
                    </Link>
                </div>

                <div style={{ flexShrink: 0 }}>
                    <Link
                        href="/generate"
                        className="btn-primary"
                        style={{ padding: "10px 20px", fontSize: 13 }}
                    >
                        Make For Free
                        <svg
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width={12}
                            height={12}
                        >
                            <path d="M2 7h10M7 2l5 5-5 5" />
                        </svg>
                    </Link>
                </div>
            </nav>

            <section
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "120px 24px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background:
                            "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.013) 79px,rgba(255,255,255,0.013) 80px), repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.013) 79px,rgba(255,255,255,0.013) 80px)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 600,
                        height: 600,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(232,227,220,0.04) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        maxWidth: 860,
                        margin: "0 auto",
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <div
                        className="hero-eyebrow"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 28,
                        }}
                    >
                        <div
                            style={{ width: 28, height: 1, background: "#333" }}
                        />
                        <span
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#555",
                            }}
                        >
                            AI Portfolio Generator
                        </span>
                    </div>

                    <h1
                        className="hero-title"
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: "clamp(52px, 8.5vw, 112px)",
                            lineHeight: 0.95,
                            letterSpacing: "-0.02em",
                            color: "#e8e3dc",
                            marginBottom: 36,
                        }}
                    >
                        Your portfolio,
                        <br />
                        <span style={{ color: "#333" }}>rewritten</span> by AI.
                    </h1>

                    <p
                        className="hero-sub"
                        style={{
                            fontSize: "clamp(15px, 1.6vw, 18px)",
                            color: "#666",
                            lineHeight: 1.75,
                            maxWidth: 520,
                            marginBottom: 44,
                        }}
                    >
                        Paste your GitHub username. Pick your projects. Let us
                        rewrite everything into sharp, minimal copy. Download a
                        single HTML file and ship it.
                    </p>

                    <div
                        className="hero-cta hero-cta-row"
                        style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link href="/generate" className="btn-primary">
                            Make My Portfolio
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
                        </Link>
                        <a href="#how" className="btn-ghost">
                            See how it works
                        </a>
                    </div>

                    <div
                        className="hero-badge"
                        style={{
                            display: "flex",
                            gap: 24,
                            marginTop: 52,
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            { val: "Free", label: "Free tier available" },
                            { val: "~2 min", label: "To generate" },
                            { val: "1 file", label: "Self-contained HTML" },
                        ].map(({ val, label }) => (
                            <div
                                key={val}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: 26,
                                        color: "#e8e3dc",
                                        lineHeight: 1,
                                    }}
                                >
                                    {val}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 10,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "#444",
                                    }}
                                >
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        right: 40,
                        bottom: 60,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#2a2a2a",
                        writingMode: "vertical-rl",
                    }}
                >
                    Powered by AI
                </div>
            </section>

            <div className="ticker-wrap">
                <div className="ticker-track">
                    {[
                        ...tickerItems,
                        ...tickerItems,
                        ...tickerItems,
                        ...tickerItems,
                    ].map((item, i) => (
                        <span key={i} className="ticker-item">
                            {item}
                            <span className="ticker-dot" />
                        </span>
                    ))}
                </div>
            </div>

            <section
                id="how"
                ref={stepsRef}
                style={{
                    padding: "112px 40px",
                    maxWidth: 1100,
                    margin: "0 auto",
                }}
            >
                <div style={{ marginBottom: 64 }}>
                    <p
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#444",
                            marginBottom: 16,
                        }}
                    >
                        How it works
                    </p>
                    <h2
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: "clamp(36px, 5vw, 60px)",
                            color: "#e8e3dc",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Four steps.
                        <br />
                        <span style={{ color: "#333" }}>One portfolio.</span>
                    </h2>
                </div>

                <div
                    className="steps-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 10,
                    }}
                >
                    {STEPS.map((step, i) => (
                        <div
                            key={step.num}
                            className={`step-card ${
                                stepsVisible ? "visible" : ""
                            }`}
                            style={{
                                transitionDelay: `${i * 0.1}s`,
                                background: "#0d0d0d",
                                border: "1px solid #161616",
                                borderRadius: "14px",
                                padding: "32px 28px",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 11,
                                    color: "#333",
                                    letterSpacing: "0.1em",
                                    marginBottom: 20,
                                }}
                            >
                                {step.num}
                            </div>
                            <div
                                style={{
                                    width: 32,
                                    height: 1,
                                    background: "#222",
                                    marginBottom: 20,
                                }}
                            />
                            <div
                                style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: 20,
                                    color: "#e8e3dc",
                                    marginBottom: 12,
                                    lineHeight: 1.2,
                                }}
                            >
                                {step.label}
                            </div>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "#555",
                                    lineHeight: 1.72,
                                }}
                            >
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section
                style={{
                    padding: "0 20px 112px",
                    maxWidth: 1100,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        border: "1px solid #161616",
                        borderRadius: 16,
                        overflow: "hidden",
                        background: "#0d0d0d",
                    }}
                >
                    <div
                        style={{
                            padding: "14px 20px",
                            borderBottom: "1px solid #161616",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                            <div
                                key={c}
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: c,
                                    opacity: 0.7,
                                }}
                            />
                        ))}
                        <div
                            style={{
                                flex: 1,
                                margin: "0 16px",
                                background: "#161616",
                                borderRadius: 6,
                                padding: "5px 14px",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                color: "#444",
                            }}
                        >
                            www.yourportfolio.com
                        </div>
                    </div>
                    <div
                        style={{
                            padding: "32px 20px",
                            background: "#0a0a0a",
                            minHeight: 320,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.015) 39px,rgba(255,255,255,0.015) 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.015) 39px,rgba(255,255,255,0.015) 40px)",
                                pointerEvents: "none",
                            }}
                        />
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 10,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.2)",
                                marginBottom: 16,
                            }}
                        >
                            Full-Stack Engineer
                        </p>
                        <div
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "clamp(48px, 14vw, 88px)",
                                fontWeight: 400,
                                color: "#e8e3dc",
                                lineHeight: 0.9,
                                letterSpacing: "-0.02em",
                                marginBottom: 32,
                            }}
                        >
                            YOUR
                            <br />
                            <span
                                style={{
                                    paddingLeft: "clamp(16px, 5vw, 44px)",
                                    color: "rgba(255,255,255,0.18)",
                                }}
                            >
                                NAME
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                                marginBottom: 24,
                            }}
                        >
                            {["React · S", "TypeScript · A", "Node.js · A"].map(
                                (tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: "0.1em",
                                            border: "1px solid #222",
                                            borderRadius: 999,
                                            padding: "5px 12px",
                                            color: "#444",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                )
                            )}
                        </div>
                        <div
                            style={{
                                display: "block",
                                width: "100%",
                                maxWidth: 260,
                                background: "rgba(10,10,10,0.9)",
                                border: "1px solid #222",
                                borderRadius: 12,
                                padding: 18,
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 11,
                                    color: "#555",
                                    lineHeight: 1.65,
                                    marginBottom: 14,
                                }}
                            >
                                Builds fast, minimal software. Cares about the
                                gap between design and engineering.
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 20,
                                    paddingBottom: 12,
                                    borderBottom: "1px solid #1a1a1a",
                                    marginBottom: 12,
                                }}
                            >
                                {[
                                    { l: "Projects", v: "12" },
                                    { l: "Years", v: "3" },
                                ].map(({ l, v }) => (
                                    <div key={l}>
                                        <div
                                            style={{
                                                fontFamily:
                                                    "'DM Mono', monospace",
                                                fontSize: 8,
                                                letterSpacing: "0.14em",
                                                textTransform: "uppercase",
                                                color: "#444",
                                                marginBottom: 3,
                                            }}
                                        >
                                            {l}
                                        </div>
                                        <div
                                            style={{
                                                fontFamily:
                                                    "'DM Serif Display', serif",
                                                fontSize: 24,
                                                color: "#e8e3dc",
                                            }}
                                        >
                                            {v}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 10,
                                    color: "#333",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                View work
                                <svg
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    width={10}
                                    height={10}
                                >
                                    <path d="M2 6h8M6 2l4 4-4 4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <p
                    style={{
                        textAlign: "center",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        color: "#333",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        marginTop: 20,
                    }}
                >
                    Your generated portfolio - ready to ship
                </p>
            </section>

            <section id="features" style={{ padding: "0 40px 112px" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div ref={featuresRef} style={{ marginBottom: 56 }}>
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#444",
                                marginBottom: 16,
                            }}
                        >
                            Features
                        </p>
                        <h2
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "clamp(34px, 4.5vw, 56px)",
                                color: "#e8e3dc",
                                lineHeight: 1,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Everything you need.
                            <br />
                            <span style={{ color: "#333" }}>
                                Nothing you don't.
                            </span>
                        </h2>
                    </div>
                    <div
                        className="features-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 2,
                        }}
                    >
                        {FEATURES.map((f, i) => (
                            <div
                                key={f.title}
                                className={`feature-card ${
                                    featuresVisible ? "visible" : ""
                                }`}
                                style={{
                                    transitionDelay: `${i * 0.08}s`,
                                    margin: "2px",
                                    padding: "28px",
                                    background: "#0d0d0d",
                                    border: "1px solid #161616",
                                    borderRadius: 4,
                                    transition: "background 0.2s",
                                    cursor: "default",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = "#111")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background =
                                        "#0d0d0d")
                                }
                            >
                                <div
                                    style={{
                                        fontSize: 22,
                                        color: "#333",
                                        marginBottom: 16,
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {f.icon}
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: 18,
                                        color: "#e8e3dc",
                                        marginBottom: 10,
                                    }}
                                >
                                    {f.title}
                                </div>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "#555",
                                        lineHeight: 1.72,
                                    }}
                                >
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: "0 40px 120px" }}>
                <div
                    ref={ctaRef}
                    className={`cta-section ${ctaVisible ? "visible" : ""}`}
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        background: "#0d0d0d",
                        border: "1px solid #161616",
                        borderRadius: 20,
                        padding: "80px 60px",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            width: 500,
                            height: 300,
                            background:
                                "radial-gradient(ellipse, rgba(232,227,220,0.03) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />
                    <h2
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: "clamp(36px, 5vw, 64px)",
                            color: "#e8e3dc",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            marginBottom: 20,
                        }}
                    >
                        Ship your portfolio
                        <br />
                        today.
                    </h2>
                    <p
                        style={{
                            fontSize: 15,
                            color: "#555",
                            maxWidth: 400,
                            margin: "0 auto 40px",
                            lineHeight: 1.72,
                        }}
                    >
                        No account needed. No credit card. Just your GitHub
                        username and two minutes.
                    </p>
                    <Link
                        href="/generate"
                        className="btn-primary"
                        style={{ fontSize: 15, padding: "16px 36px" }}
                    >
                        Make My Portfolio
                        <svg
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            width={14}
                            height={14}
                        >
                            <path d="M2 7h10M7 2l5 5-5 5" />
                        </svg>
                    </Link>
                </div>
            </section>

            <footer
                style={{ borderTop: "1px solid #111", padding: "32px 40px" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 15,
                            color: "#e8e3dc",
                        }}
                    >
                        makemyfolio
                    </span>
                    <p
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            color: "#333",
                            letterSpacing: "0.1em",
                        }}
                    >
                        Copyright © {new Date().getFullYear()} | makemyfolio
                    </p>
                    <div style={{ display: "flex", gap: 24 }}>
                        <Link
                            href="/generate"
                            className="nav-link"
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.1em",
                            }}
                        >
                            Generate
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
