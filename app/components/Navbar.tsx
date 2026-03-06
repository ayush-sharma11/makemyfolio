"use client";

import { useEffect, useState } from "react";

interface NavbarProps {
    name?: string;
}

export default function Navbar({ name = "Velos" }: NavbarProps) {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 32px",
                zIndex: 100,
                transition: "background 0.4s, border-color 0.4s",
                borderBottom: scrolled
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid transparent",
                background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
                backdropFilter: scrolled ? "blur(16px)" : "none",
            }}
        >
            <a
                href="#"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                }}
            >
                <div
                    style={{
                        width: 30,
                        height: 30,
                        background: "#fff",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="#000"
                        strokeWidth="2.2"
                        width={16}
                        height={16}
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
                {name}
            </a>

            <ul
                style={{
                    display: "flex",
                    gap: 28,
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                }}
            >
                {["Works", "Skills", "Experience", "Methodology"].map(
                    (item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                style={{
                                    color: "rgba(255,255,255,0.65)",
                                    textDecoration: "none",
                                    fontSize: 13,
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) =>
                                    ((
                                        e.target as HTMLAnchorElement
                                    ).style.color = "#fff")
                                }
                                onMouseLeave={(e) =>
                                    ((
                                        e.target as HTMLAnchorElement
                                    ).style.color = "rgba(255,255,255,0.65)")
                                }
                            >
                                {item}
                            </a>
                        </li>
                    )
                )}
            </ul>

            <div style={{ display: "flex", gap: 10 }}>
                {(["Search", "Menu"] as const).map((label) => (
                    <button
                        key={label}
                        aria-label={label}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "rgba(255,255,255,0.65)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                        }}
                    >
                        {label === "Search" ? (
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                width={18}
                                height={18}
                            >
                                <circle cx="9" cy="9" r="6" />
                                <path d="M14 14l3 3" />
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                width={18}
                                height={18}
                            >
                                <path d="M3 5h14M3 10h14M3 15h14" />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
}
