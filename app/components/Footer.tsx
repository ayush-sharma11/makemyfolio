"use client";

interface FooterProps {
    name?: string;
    email?: string;
}

export default function Footer({
    name = "Your Name",
    email = "hello@yoursite.com",
}: FooterProps) {
    return (
        <footer style={{ background: "#0a0a0a", padding: "56px 32px 32px" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1fr",
                    gap: 40,
                    paddingBottom: 44,
                    borderBottom: "1px solid #2a2a2a",
                    marginBottom: 28,
                }}
            >
                {/* Brand */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 14,
                        }}
                    >
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="#000"
                                strokeWidth="2.2"
                                width={14}
                                height={14}
                            >
                                <circle cx="7" cy="7" r="4" />
                                <circle
                                    cx="7"
                                    cy="7"
                                    r="1.2"
                                    fill="#000"
                                    stroke="none"
                                />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: "#fff",
                            }}
                        >
                            {name}
                        </span>
                    </div>
                    <p
                        style={{
                            fontSize: 12,
                            color: "#666",
                            lineHeight: 1.72,
                            maxWidth: 270,
                            marginBottom: 22,
                        }}
                    >
                        Building things for the web. Open to interesting
                        projects and full-time roles.
                    </p>
                    <div style={{ display: "flex" }}>
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid #2a2a2a",
                                borderRight: "none",
                                borderRadius: "8px 0 0 8px",
                                padding: "10px 14px",
                                fontSize: 12,
                                color: "#fff",
                                fontFamily: "inherit",
                                outline: "none",
                                flex: 1,
                                minWidth: 0,
                            }}
                        />
                        <button
                            style={{
                                background: "#fff",
                                color: "#0a0a0a",
                                border: "1px solid #fff",
                                borderRadius: "0 8px 8px 0",
                                padding: "10px 16px",
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                fontFamily: "inherit",
                            }}
                        >
                            Connect
                        </button>
                    </div>
                </div>

                {/* Link columns */}
                {[
                    {
                        title: "Portfolio",
                        links: ["About", "Projects", "Skills", "Process"],
                    },
                    {
                        title: "Connect",
                        links: ["GitHub", "LinkedIn", "Twitter", email],
                    },
                ].map(({ title, links }) => (
                    <div key={title}>
                        <h4
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 16,
                            }}
                        >
                            {title}
                        </h4>
                        <ul
                            style={{ listStyle: "none", padding: 0, margin: 0 }}
                        >
                            {links.map((link) => (
                                <li key={link} style={{ marginBottom: 10 }}>
                                    <a
                                        href="#"
                                        style={{
                                            fontSize: 13,
                                            color: "#666",
                                            textDecoration: "none",
                                            display: "inline-block",
                                            transition:
                                                "color 0.2s, padding-left 0.25s",
                                        }}
                                        onMouseEnter={(e) => {
                                            (
                                                e.target as HTMLAnchorElement
                                            ).style.color = "#fff";
                                            (
                                                e.target as HTMLAnchorElement
                                            ).style.paddingLeft = "5px";
                                        }}
                                        onMouseLeave={(e) => {
                                            (
                                                e.target as HTMLAnchorElement
                                            ).style.color = "#666";
                                            (
                                                e.target as HTMLAnchorElement
                                            ).style.paddingLeft = "0";
                                        }}
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p style={{ fontSize: 11, color: "#666" }}>
                    © {new Date().getFullYear()} {name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
