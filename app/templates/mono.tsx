import { Template } from "./index";
import { PortfolioData } from "../lib/export";

const DEFAULT_FAVICON = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='4' fill='%23f5f0e8'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='18' fill='%23111'>_</text></svg>`;

function generate(data: PortfolioData): string {
    const faviconHref = data.favicon || DEFAULT_FAVICON;
    const skillsByCategory = data.skills.reduce(
        (acc, sk) => {
            if (!acc[sk.category]) acc[sk.category] = [];
            acc[sk.category].push(sk);
            return acc;
        },
        {} as Record<string, typeof data.skills>,
    );

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${data.name} - Portfolio</title>
<link rel="icon" href="${faviconHref}"/>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:#f5f0e8;color:#111;font-family:'IBM Plex Sans',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:#111;color:#f5f0e8}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes barFill{from{width:0}}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:#f5f0e8;border-bottom:1px solid #d4cfc6;padding:0 40px;display:flex;align-items:center;justify-content:space-between;height:52px;gap:16px}
.nav-name{font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:500;color:#111;text-decoration:none}
.nav-name span{color:#888}
.nav-links{display:flex;gap:0}
.nav-links a{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#888;text-decoration:none;padding:0 16px;border-left:1px solid #d4cfc6;transition:color .2s;height:52px;display:flex;align-items:center}
.nav-links a:first-child{border-left:none}
.nav-links a:hover{color:#111}
.open-badge{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#4ade80;display:flex;align-items:center;gap:6px;flex-shrink:0}
.open-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;animation:blink 2s infinite}

/* HERO */
.hero{padding:120px 40px 80px;border-bottom:1px solid #d4cfc6;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:end;animation:fadeUp .7s .1s both}
.hero-left{}
.hero-prompt{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#888;margin-bottom:24px;display:flex;align-items:center;gap:8px}
.hero-prompt::before{content:'>';color:#4ade80;font-weight:600}
.hero-name{font-family:'IBM Plex Mono',monospace;font-size:clamp(36px,6vw,72px);font-weight:600;line-height:1;letter-spacing:-.02em;color:#111;margin-bottom:8px}
.hero-title{font-family:'IBM Plex Mono',monospace;font-size:clamp(14px,2vw,18px);color:#888;margin-bottom:40px;font-weight:400}
.hero-bio{font-size:15px;color:#555;line-height:1.78;max-width:420px}
.hero-right{padding-bottom:4px}
.hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#d4cfc6;border:1px solid #d4cfc6;margin-bottom:24px}
.hero-stat{background:#f5f0e8;padding:20px;display:flex;flex-direction:column;gap:6px}
.hero-stat-val{font-family:'IBM Plex Mono',monospace;font-size:28px;font-weight:600;color:#111}
.hero-stat-label{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#888;letter-spacing:.1em;text-transform:uppercase}
.hero-email{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#888}
.hero-email a{color:#111;text-decoration:none;border-bottom:1px solid #d4cfc6;transition:border-color .2s}
.hero-email a:hover{border-color:#111}

/* SECTIONS */
.section{border-bottom:1px solid #d4cfc6}
.section-inner{max-width:1100px;margin:0 auto;padding:80px 40px}
.section-label{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#888;letter-spacing:.14em;text-transform:uppercase;margin-bottom:40px;display:flex;align-items:center;gap:12px}
.section-label::after{content:'';flex:1;height:1px;background:#d4cfc6}

/* PROJECTS */
.project-list{display:flex;flex-direction:column;gap:0}
.project-item{padding:28px 0;border-top:1px solid #d4cfc6;display:grid;grid-template-columns:48px 1fr auto;gap:24px;align-items:start;text-decoration:none;color:inherit;transition:background .15s}
.project-item:last-child{border-bottom:1px solid #d4cfc6}
.project-num{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#bbb;padding-top:3px}
.project-body{}
.project-name{font-family:'IBM Plex Mono',monospace;font-size:18px;font-weight:500;color:#111;margin-bottom:8px;display:flex;align-items:center;gap:10px}
.project-name-arrow{color:#bbb;font-size:14px;transition:transform .2s,color .2s}
.project-item:hover .project-name-arrow{transform:translate(2px,-2px);color:#111}
.project-desc{font-size:13px;color:#777;line-height:1.7}
.project-tags{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;padding-top:3px}
.project-tag{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#888;background:#ede9df;padding:3px 10px;border-radius:2px}

/* SKILLS */
.skills-table{width:100%;border-collapse:collapse}
.skills-table th{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#888;text-align:left;padding:0 0 12px;border-bottom:1px solid #d4cfc6}
.skills-table th:last-child{text-align:right}
.skills-table td{padding:14px 0;border-bottom:1px solid #ede9df;vertical-align:middle}
.skills-table tr:last-child td{border-bottom:none}
.skill-name-cell{font-family:'IBM Plex Mono',monospace;font-size:14px;color:#111;font-weight:500;width:180px}
.skill-cat-cell{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#888;width:120px}
.skill-bar-cell{width:200px}
.skill-bar-wrap{height:2px;background:#d4cfc6;border-radius:1px;overflow:hidden}
.skill-bar-fill{height:100%;background:#111;border-radius:1px;animation:barFill .8s ease both}
.skill-tier-cell{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#888;text-align:right;width:40px}
.skill-tier-cell.s{color:#111;font-weight:600}
.skill-tier-cell.a{color:#555}
.skill-cat-header{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#bbb;padding:20px 0 8px;font-weight:400}

/* EXPERIENCE */
.exp-list{display:flex;flex-direction:column;gap:0}
.exp-item{padding:28px 0;border-top:1px solid #d4cfc6;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start}
.exp-item:last-child{border-bottom:1px solid #d4cfc6}
.exp-title{font-family:'IBM Plex Mono',monospace;font-size:16px;font-weight:500;color:#111;margin-bottom:4px}
.exp-company{font-family:'IBM Plex Mono',monospace;font-size:13px;color:#555;margin-bottom:4px}
.exp-location{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#888}
.exp-right{text-align:right}
.exp-period{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#555;margin-bottom:6px}
.exp-type{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#888;background:#ede9df;padding:3px 10px;border-radius:2px;display:inline-block}

/* FOOTER */
footer{background:#111;color:#f5f0e8;padding:32px 40px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.footer-name{font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:500}
.footer-copy{font-family:'IBM Plex Mono',monospace;font-size:10px;color:#444;letter-spacing:.1em;text-transform:uppercase}
.footer-links{display:flex;gap:24px}
.footer-links a{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#444;text-decoration:none;transition:color .2s}
.footer-links a:hover{color:#f5f0e8}

/* REVEAL */
.reveal{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s}
.reveal.visible{opacity:1;transform:none}

/* RESPONSIVE */
@media(max-width:900px){
  nav{padding:0 24px}
  .hero{padding:100px 24px 60px;grid-template-columns:1fr;gap:40px}
  .section-inner{padding:60px 24px}
}
@media(max-width:640px){
  .nav-links{display:none}
  .hero{padding:80px 16px 48px}
  .section-inner{padding:48px 16px}
  .project-item{grid-template-columns:32px 1fr}
  .project-tags{display:none}
  .exp-item{grid-template-columns:1fr}
  .exp-right{text-align:left}
  .skills-table .skill-bar-cell,.skills-table .skill-cat-cell{display:none}
  footer{flex-direction:column;align-items:flex-start;padding:24px 16px}
}
</style>
</head>
<body>
<nav>
  <a class="nav-name" href="#"><span>~/</span>${data.name.toLowerCase().replace(/\s+/g, "-")}</a>
  <div class="nav-links">
    <a href="#work">work</a><a href="#skills">skills</a><a href="#experience">experience</a>
    ${data.email ? `<a href="mailto:${data.email}">contact</a>` : ""}
  </div>
  ${data.openToWork ? `<div class="open-badge"><div class="open-dot"></div>open_to_work</div>` : ""}
</nav>

<div class="hero">
  <div class="hero-left">
    <div class="hero-prompt">${data.title.toLowerCase()}</div>
    <div class="hero-name">${data.name.split(" ")[0]}<br>${data.name.split(" ").slice(1).join(" ") || ""}</div>
    <div class="hero-bio">${data.bio}</div>
  </div>
  <div class="hero-right">
    <div class="hero-stats">
      <div class="hero-stat"><span class="hero-stat-val">${data.projects.length}</span><span class="hero-stat-label">Projects</span></div>
      <div class="hero-stat"><span class="hero-stat-val">${data.skills.length}</span><span class="hero-stat-label">Skills</span></div>
      <div class="hero-stat"><span class="hero-stat-val">${data.experience.length}</span><span class="hero-stat-label">Roles</span></div>
      <div class="hero-stat"><span class="hero-stat-val">${data.skills.filter((s) => s.tier === "S").length}</span><span class="hero-stat-label">S-Tier</span></div>
    </div>
    ${data.email ? `<div class="hero-email">✉ <a href="mailto:${data.email}">${data.email}</a></div>` : ""}
  </div>
</div>

<section class="section" id="work"><div class="section-inner">
  <div class="section-label reveal">Selected Work</div>
  <div class="project-list">
    ${data.projects
        .map(
            (p, i) => `
    <${p.url ? `a href="${p.url}" target="_blank" rel="noopener"` : "div"} class="project-item reveal" style="animation-delay:${i * 0.07}s">
      <div class="project-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="project-body">
        <div class="project-name">${p.name}${p.url ? `<span class="project-name-arrow">↗</span>` : ""}</div>
        <div class="project-desc">${p.description}</div>
      </div>
      <div class="project-tags"><span class="project-tag">${p.status}</span><span class="project-tag">${p.location}</span></div>
    </${p.url ? "a" : "div"}>
    `,
        )
        .join("")}
  </div>
</div></section>

<section class="section" id="skills"><div class="section-inner">
  <div class="section-label reveal">Stack & Skills</div>
  <table class="skills-table reveal">
    <thead><tr>
      <th>Skill</th><th>Category</th><th>Proficiency</th><th>Years</th><th>Tier</th>
    </tr></thead>
    <tbody>
      ${Object.entries(skillsByCategory)
          .map(
              ([cat, catSkills]) => `
      ${catSkills
          .map(
              (sk, i) => `
      <tr>
        ${i === 0 ? `` : ``}
        <td class="skill-name-cell">${sk.name}</td>
        <td class="skill-cat-cell">${i === 0 ? cat : ""}</td>
        <td class="skill-bar-cell"><div class="skill-bar-wrap"><div class="skill-bar-fill" style="width:${sk.proficiency}%;animation-delay:${0.2 + i * 0.05}s"></div></div></td>
        <td style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#888;padding-left:12px">${sk.years}</td>
        <td class="skill-tier-cell ${sk.tier.toLowerCase()}">${sk.tier}</td>
      </tr>
      `,
          )
          .join("")}
      `,
          )
          .join("")}
    </tbody>
  </table>
</div></section>

<section class="section" id="experience"><div class="section-inner">
  <div class="section-label reveal">Experience</div>
  <div class="exp-list">
    ${data.experience
        .map(
            (ex, i) => `
    <div class="exp-item reveal" style="animation-delay:${i * 0.08}s">
      <div><div class="exp-title">${ex.title}</div><div class="exp-company">${ex.company}</div><div class="exp-location">${ex.location}</div></div>
      <div class="exp-right"><div class="exp-period">${ex.period}</div><span class="exp-type">${ex.type}</span></div>
    </div>
    `,
        )
        .join("")}
  </div>
</div></section>

<footer>
  <span class="footer-name">${data.name}</span>
  <span class="footer-copy">Built with makemyfolio</span>
  <div class="footer-links"><a href="#work">work</a><a href="#skills">skills</a>${data.email ? `<a href="mailto:${data.email}">contact</a>` : ""}</div>
</footer>

<script>
const obs=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
</script>
</body></html>`;
}

const preview = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="280" height="180" fill="#f5f0e8"/>
  <!-- nav -->
  <rect width="280" height="24" fill="#f5f0e8" stroke="#d4cfc6" stroke-width="1"/>
  <rect x="12" y="9" width="60" height="6" rx="1" fill="#111" opacity=".8"/>
  <line x1="160" y1="0" x2="160" y2="24" stroke="#d4cfc6" stroke-width="1"/>
  <line x1="200" y1="0" x2="200" y2="24" stroke="#d4cfc6" stroke-width="1"/>
  <line x1="240" y1="0" x2="240" y2="24" stroke="#d4cfc6" stroke-width="1"/>
  <rect x="168" y="9" width="24" height="6" rx="1" fill="#d4cfc6"/>
  <rect x="208" y="9" width="24" height="6" rx="1" fill="#d4cfc6"/>
  <!-- hero left -->
  <rect x="12" y="36" width="20" height="4" rx="1" fill="#4ade80" opacity=".7"/>
  <rect x="36" y="36" width="60" height="4" rx="1" fill="#bbb"/>
  <text x="12" y="72" font-family="monospace" font-size="20" fill="#111" font-weight="600">YOUR</text>
  <text x="12" y="90" font-family="monospace" font-size="20" fill="#111" font-weight="600">NAME</text>
  <rect x="12" y="100" width="100" height="3" rx="1" fill="#ccc"/>
  <rect x="12" y="107" width="80" height="3" rx="1" fill="#ddd"/>
  <rect x="12" y="114" width="90" height="3" rx="1" fill="#ddd"/>
  <!-- hero right stats grid -->
  <rect x="156" y="30" width="112" height="60" fill="none" stroke="#d4cfc6" stroke-width="1"/>
  <line x1="212" y1="30" x2="212" y2="90" stroke="#d4cfc6" stroke-width="1"/>
  <line x1="156" y1="60" x2="268" y2="60" stroke="#d4cfc6" stroke-width="1"/>
  <text x="168" y="50" font-family="monospace" font-size="13" fill="#111" font-weight="600">12</text>
  <text x="224" y="50" font-family="monospace" font-size="13" fill="#111" font-weight="600">8</text>
  <text x="168" y="80" font-family="monospace" font-size="13" fill="#111" font-weight="600">3</text>
  <text x="224" y="80" font-family="monospace" font-size="13" fill="#111" font-weight="600">4</text>
  <!-- project rows -->
  <line x1="0" y1="132" x2="280" y2="132" stroke="#d4cfc6" stroke-width="1"/>
  <rect x="12" y="140" width="16" height="3" rx="1" fill="#ccc"/>
  <rect x="36" y="140" width="70" height="6" rx="1" fill="#111" opacity=".7"/>
  <rect x="36" y="150" width="100" height="3" rx="1" fill="#ccc"/>
  <rect x="220" y="139" width="36" height="8" rx="2" fill="#ede9df"/>
  <line x1="0" y1="162" x2="280" y2="162" stroke="#d4cfc6" stroke-width="1"/>
  <rect x="12" y="168" width="16" height="3" rx="1" fill="#ccc"/>
  <rect x="36" y="168" width="55" height="6" rx="1" fill="#111" opacity=".7"/>
  <rect x="220" y="167" width="36" height="8" rx="2" fill="#ede9df"/>
</svg>`;

export const mono: Template = {
    id: "mono",
    name: "Mono",
    description:
        "Clean light layout. Monospace type, tabular skills, terminal-inspired nav.",
    tags: ["Light", "Monospace", "Minimal"],
    preview,
    generate,
};
