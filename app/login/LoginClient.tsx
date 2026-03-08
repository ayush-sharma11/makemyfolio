"use client";

export const dynamic = "force-dynamic";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginClient() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? "/generate";

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#080808",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                        "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.007) 79px,rgba(255,255,255,0.007) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.007) 79px,rgba(255,255,255,0.007) 80px)",
                }}
            />
            <div className="grain" />

            <div
                style={{
                    width: "100%",
                    maxWidth: 400,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 48,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 20,
                            color: "#e8e3dc",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        makemyfolio
                    </span>
                </div>

                <div
                    style={{
                        marginBottom: 8,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase" as const,
                        color: "#444",
                    }}
                >
                    Sign in to continue
                </div>
                <h1
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "clamp(36px, 8vw, 52px)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                        color: "#e8e3dc",
                        marginBottom: 16,
                    }}
                >
                    Build your
                    <br />
                    portfolio.
                </h1>
                <p
                    style={{
                        fontSize: 14,
                        color: "#555",
                        lineHeight: 1.7,
                        marginBottom: 40,
                    }}
                >
                    Sign in with GitHub to generate your portfolio. We only use
                    your public profile.
                </p>

                <button
                    onClick={() => signIn("github", { callbackUrl })}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        background: "#e8e3dc",
                        color: "#080808",
                        border: "none",
                        borderRadius: 999,
                        padding: "15px 28px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "'Outfit', sans-serif",
                        transition: "background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#e8e3dc";
                        e.currentTarget.style.transform = "none";
                    }}
                >
                    <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width={18}
                        height={18}
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Continue with GitHub
                </button>

                <p
                    style={{
                        marginTop: 20,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: "#2a2a2a",
                        letterSpacing: "0.08em",
                        textAlign: "center" as const,
                        lineHeight: 1.7,
                    }}
                >
                    By signing in you agree to our terms.
                    <br />
                    We never access your private repos.
                </p>
            </div>
        </div>
    );
}
