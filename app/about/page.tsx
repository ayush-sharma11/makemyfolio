/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";

export default function AboutPage() {
    return (
        <>
            <style>{`
                *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
                body{background:#080808;color:#e8e3dc;font-family:'Outfit',sans-serif}
                ::selection{background:#e8e3dc;color:#080808}
                .grain{position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.032;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")}
                @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
                .fade-up{animation:fadeUp .6s both}
                .nav-link{font-family:'DM Mono',monospace;font-size:11px;color:#555;text-decoration:none;letter-spacing:.1em;transition:color .2s}
                .nav-link:hover{color:#e8e3dc}
                .ext-link{color:#e8e3dc;text-decoration:none;border-bottom:1px solid #2a2a2a;transition:border-color .2s}
                .ext-link:hover{border-color:#e8e3dc}
                .pill{display:inline-flex;align-items:center;gap:8px;border:1px solid #1c1c1c;border-radius:999px;padding:10px 18px;font-family:'DM Mono',monospace;font-size:11px;color:#555;text-decoration:none;letter-spacing:.08em;transition:border-color .2s,color .2s;white-space:nowrap}
                .pill:hover{border-color:#3a3a3a;color:#e8e3dc}
                .pill.primary{background:#e8e3dc;color:#080808;border-color:#e8e3dc;font-weight:600}
                .pill.primary:hover{background:#fff;border-color:#fff;color:#080808}
                .open-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);border-radius:999px;padding:6px 14px;font-family:'DM Mono',monospace;font-size:10px;color:#4ade80;letter-spacing:.1em}
                @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
                .blink{animation:blink 2s ease-in-out infinite}
                .divider{border:none;border-top:1px solid #111;margin:56px 0}
                .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
                @media(max-width:600px){.grid-2{grid-template-columns:1fr}.links-row{flex-direction:column!important;align-items:flex-start!important}}
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
                <Link
                    href="/"
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 18,
                        color: "#e8e3dc",
                        letterSpacing: "-0.01em",
                        textDecoration: "none",
                    }}
                >
                    makemyfolio
                </Link>
                <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
                    <Link href="/" className="nav-link">
                        Home
                    </Link>
                    <Link href="/generate" className="nav-link">
                        Generate
                    </Link>
                </div>
            </nav>

            <main style={{ paddingTop: 88, paddingBottom: 100 }}>
                <div
                    style={{
                        maxWidth: 680,
                        margin: "0 auto",
                        padding: "56px 24px 0",
                    }}
                >
                    {/* Header */}
                    <div className="fade-up" style={{ marginBottom: 64 }}>
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#444",
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <span
                                style={{
                                    width: 28,
                                    height: 1,
                                    background: "#333",
                                    display: "inline-block",
                                }}
                            />
                            About
                        </p>
                        <h1
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "clamp(48px, 9vw, 96px)",
                                lineHeight: 1,
                                letterSpacing: "-0.02em",
                                color: "#e8e3dc",
                                marginBottom: 32,
                            }}
                        >
                            Ayush
                            <br />
                            <span style={{ color: "#333" }}>Sharma.</span>
                        </h1>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 28,
                                flexWrap: "wrap",
                            }}
                        >
                            <span className="open-badge">
                                <span
                                    className="blink"
                                    style={{
                                        width: 5,
                                        height: 5,
                                        borderRadius: "50%",
                                        background: "#4ade80",
                                        display: "inline-block",
                                    }}
                                />
                                Open to work
                            </span>
                            <span
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 10,
                                    color: "#333",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                CS Student · Final Year
                            </span>
                        </div>

                        <p
                            style={{
                                fontSize: 16,
                                color: "#666",
                                lineHeight: 1.8,
                                maxWidth: 560,
                            }}
                        >
                            Fourth-year CSE student, nearly done. I build things
                            that feel worth building - makemyfolio is one of
                            them. You can find the rest at{" "}
                            <a
                                href="https://ayushsharma.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ext-link"
                            >
                                ayushsharma.dev
                            </a>
                            .
                        </p>
                    </div>

                    <hr className="divider" />

                    {/* About the site */}
                    <div
                        className="fade-up"
                        style={{ animationDelay: "0.1s", marginBottom: 56 }}
                    >
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#444",
                                marginBottom: 24,
                            }}
                        >
                            The project
                        </p>
                        <h2
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "clamp(28px, 4vw, 40px)",
                                color: "#e8e3dc",
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                marginBottom: 20,
                            }}
                        >
                            Built to challenge myself.
                            <br />
                            <span style={{ color: "#333" }}>
                                Turned into something real.
                            </span>
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#666",
                                    lineHeight: 1.8,
                                }}
                            >
                                makemyfolio started as a personal challenge -
                                could I build something end-to-end that people
                                would actually use? The answer ended up being a
                                tool that turns your GitHub profile into a
                                polished portfolio in under two minutes.
                            </p>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#666",
                                    lineHeight: 1.8,
                                }}
                            >
                                It connects to GitHub's API, pulls your repos,
                                feeds your details into the AI model, and
                                rewrites everything - bio, project descriptions,
                                skill tiers - into clean, minimal copy. The
                                output is a single self-contained HTML file you
                                can drop anywhere and call done.
                            </p>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#666",
                                    lineHeight: 1.8,
                                }}
                            >
                                The whole stack is Next.js, NextAuth, Prisma on
                                Neon, and glorious AI. Dark by default, because
                                that's how it should be.
                            </p>
                        </div>
                    </div>

                    <hr className="divider" />

                    {/* What's inside */}
                    <div
                        className="fade-up"
                        style={{ animationDelay: "0.15s", marginBottom: 56 }}
                    >
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#444",
                                marginBottom: 24,
                            }}
                        >
                            What's inside
                        </p>
                        <div className="grid-2">
                            {[
                                {
                                    icon: "◈",
                                    title: "GitHub Import",
                                    desc: "Repos fetched automatically from the GitHub API.",
                                },
                                {
                                    icon: "◎",
                                    title: "AI Copywriting",
                                    desc: "AI rewrites your bio and project descriptions.",
                                },
                                {
                                    icon: "▣",
                                    title: "Multiple Templates",
                                    desc: "Different aesthetics, same sharp content underneath.",
                                },
                                {
                                    icon: "◇",
                                    title: "Skill Tiers",
                                    desc: "S / A / B ranking system based on years and proficiency.",
                                },
                                {
                                    icon: "○",
                                    title: "Single File Export",
                                    desc: "One HTML file. Host it anywhere in under a minute.",
                                },
                                {
                                    icon: "◐",
                                    title: "Zero Lock-in",
                                    desc: "No subscriptions. No platforms. Just a file.",
                                },
                            ].map((f) => (
                                <div
                                    key={f.title}
                                    style={{
                                        padding: "20px",
                                        background: "#0d0d0d",
                                        border: "1px solid #161616",
                                        borderRadius: 10,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "monospace",
                                            fontSize: 16,
                                            color: "#333",
                                            display: "block",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {f.icon}
                                    </span>
                                    <div
                                        style={{
                                            fontFamily:
                                                "'DM Serif Display', serif",
                                            fontSize: 16,
                                            color: "#e8e3dc",
                                            marginBottom: 6,
                                        }}
                                    >
                                        {f.title}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            color: "#555",
                                            lineHeight: 1.65,
                                        }}
                                    >
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="divider" />

                    {/* Links */}
                    <div
                        className="fade-up"
                        style={{ animationDelay: "0.2s", marginBottom: 56 }}
                    >
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "#444",
                                marginBottom: 24,
                            }}
                        >
                            Find me
                        </p>
                        <div
                            className="links-row"
                            style={{
                                display: "flex",
                                gap: 10,
                                flexWrap: "wrap",
                            }}
                        >
                            <a
                                href="https://ayushsharma.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pill primary"
                            >
                                <svg
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    width={11}
                                    height={11}
                                >
                                    <path d="M7 1a6 6 0 100 12A6 6 0 007 1zM1 7h12M7 1c-1.5 2-2.5 4-2.5 6s1 4 2.5 6M7 1c1.5 2 2.5 4 2.5 6S8.5 11 7 13" />
                                </svg>
                                ayushsharma.dev
                            </a>
                            <a
                                href="https://github.com/ayush-sharma11"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pill"
                            >
                                <svg
                                    viewBox="0 0 14 14"
                                    fill="currentColor"
                                    width={12}
                                    height={12}
                                >
                                    <path d="M7 .5A6.5 6.5 0 00.5 7c0 2.87 1.86 5.3 4.44 6.16.32.06.44-.14.44-.3v-1.05c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-.95-.72-.95-.59-.4.04-.39.04-.39.65.04 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.43-.16-2.94-.72-2.94-3.19 0-.7.25-1.28.67-1.73-.07-.16-.29-.82.06-1.7 0 0 .55-.18 1.79.67A6.23 6.23 0 017 3.89c.55 0 1.11.07 1.63.22 1.24-.85 1.79-.67 1.79-.67.35.88.13 1.54.06 1.7.42.45.67 1.03.67 1.73 0 2.48-1.51 3.03-2.95 3.19.23.2.44.59.44 1.19v1.77c0 .17.12.37.44.3A6.501 6.501 0 0013.5 7 6.5 6.5 0 007 .5z" />
                                </svg>
                                ayush-sharma11
                            </a>
                        </div>
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
                        maxWidth: 680,
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
                        © {new Date().getFullYear()} Ayush Sharma
                    </p>
                </div>
            </footer>
        </>
    );
}
