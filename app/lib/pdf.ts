import jsPDF from "jspdf";
import { PortfolioData } from "./export";

export function generatePDF(data: PortfolioData) {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    const margin = 20;
    const contentW = W - margin * 2;
    let y = 0;

    const BLACK = "#0a0a0a";
    const DARK = "#222222";
    const MID = "#555555";
    const MUTED = "#888888";
    const RULE_COLOR = "#cccccc";

    const setColor = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        doc.setTextColor(r, g, b);
    };

    const rule = (yPos: number) => {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos, W - margin, yPos);
    };

    const label = (text: string, yPos: number) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        setColor(MUTED);
        doc.text(text.toUpperCase(), margin, yPos);
        return yPos + 5.5;
    };

    // Header
    y = 24;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    setColor(BLACK);
    doc.text(data.name, margin, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    setColor(DARK);
    doc.text(data.title, margin, y);

    if (data.openToWork) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        setColor("#16a34a");
        doc.text("OPEN TO WORK", W - margin, 24, { align: "right" });
    }

    if (data.email) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        setColor(MID);
        doc.text(data.email, W - margin, 32, { align: "right" });
    }

    y += 9;
    rule(y);
    y += 8;

    // Bio───
    y = label("About", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor(DARK);
    const bioLines = doc.splitTextToSize(data.bio, contentW);
    doc.text(bioLines, margin, y);
    y += bioLines.length * 5 + 10;
    rule(y);
    y += 8;

    // ── Experience ──────────────────────────────────────
    y = label("Experience", y);
    for (const exp of data.experience) {
        if (y > 260) {
            doc.addPage();
            y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        setColor(BLACK);
        doc.text(exp.title, margin, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        setColor(MID);
        doc.text(`${exp.company} · ${exp.location}`, margin, y + 5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        setColor(MUTED);
        doc.text(`${exp.period} · ${exp.type}`, W - margin, y, {
            align: "right",
        });

        y += 15;
    }

    y += 2;
    rule(y);
    y += 8;

    // ── Projects ────────────────────────────────────────
    y = label("Projects", y);
    for (const project of data.projects) {
        if (y > 255) {
            doc.addPage();
            y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        setColor(BLACK);
        doc.text(project.name, margin, y);

        if (project.status) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(7.5);
            setColor(MUTED);
            doc.text(project.status.toUpperCase(), W - margin, y, {
                align: "right",
            });
        }

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        setColor(DARK);
        const descLines = doc.splitTextToSize(project.description, contentW);
        doc.text(descLines, margin, y + 5);

        if (project.url) {
            doc.setFontSize(8);
            setColor(MUTED);
            doc.text(project.url, margin, y + 5 + descLines.length * 4.5);
            y += descLines.length * 4.5 + 4;
        }

        y += 14;
    }

    y += 2;
    rule(y);
    y += 8;

    // Skills
    if (y > 250) {
        doc.addPage();
        y = 20;
    }
    y = label("Skills", y);

    const grouped = data.skills.reduce<Record<string, typeof data.skills>>(
        (acc, sk) => {
            if (!acc[sk.category]) acc[sk.category] = [];
            acc[sk.category].push(sk);
            return acc;
        },
        {},
    );

    for (const [category, skills] of Object.entries(grouped)) {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        setColor(MID);
        doc.text(category, margin, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        setColor(DARK);
        doc.text(skills.map((s) => s.name).join("  ·  "), margin + 30, y);
        y += 7.5;
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        setColor(RULE_COLOR);
        doc.text("Generated with makemyfolio", margin, 290);
        doc.text(`${i} / ${pageCount}`, W - margin, 290, { align: "right" });
    }

    doc.save(`${data.name.toLowerCase().replace(/\s+/g, "-")}-resume.pdf`);
}
