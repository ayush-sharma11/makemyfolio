import { Template } from "./index";
import { PortfolioData } from "../lib/export";

const DEFAULT_FAVICON = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23e8e3dc'/><circle cx='16' cy='16' r='7' fill='none' stroke='%23080808' stroke-width='2.5'/><circle cx='16' cy='16' r='2.5' fill='%23080808'/></svg>`;

function generate(data: PortfolioData): string {
    const nameParts = data.name.toUpperCase().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
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
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:#080808;color:#e8e3dc;font-family:'Outfit',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:#e8e3dc;color:#080808}
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:999;opacity:.028;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")}
body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;background:repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.01) 79px,rgba(255,255,255,0.01) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.01) 79px,rgba(255,255,255,0.01) 80px)}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes barFill{from{width:0}}
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:16px 40px;border-bottom:1px solid #111;background:rgba(8,8,8,.9);backdrop-filter:blur(20px);gap:16px}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
.nav-logo-dot{width:24px;height:24px;border-radius:50%;background:#e8e3dc;display:flex;align-items:center;justify-content:center}
.nav-name{font-family:'DM Serif Display',serif;font-size:16px;color:#e8e3dc;letter-spacing:-.01em}
.nav-links{display:flex;gap:28px}
.nav-links a{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#444;text-decoration:none;transition:color .2s}
.nav-links a:hover{color:#e8e3dc}
.open-badge{display:flex;align-items:center;gap:8px;border:1px solid #1c1c1c;border-radius:999px;padding:6px 14px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#555;flex-shrink:0}
.open-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80;animation:blink 2s infinite;flex-shrink:0}
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:100px 40px 64px;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%,rgba(232,227,220,.04) 0%,transparent 60%)}
.hero-content{position:relative;z-index:2;animation:fadeUp .9s .1s both}
.hero-eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:28px}
.hero-eyebrow-line{width:32px;height:1px;background:#2a2a2a;flex-shrink:0}
.hero-eyebrow span{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#444}
.hero-name{font-family:'DM Serif Display',serif;font-size:clamp(64px,12vw,160px);font-weight:400;line-height:.88;letter-spacing:-.02em;color:#e8e3dc;margin-bottom:48px}
.hero-name .last{padding-left:clamp(28px,5vw,72px);color:rgba(232,227,220,.18)}
.hero-footer{display:flex;align-items:flex-end;justify-content:space-between;position:relative;z-index:2;animation:fadeUp .7s .35s both;gap:32px;flex-wrap:wrap}
.hero-bio p{font-size:15px;color:#555;line-height:1.78;margin-bottom:24px}
.hero-stats{display:flex;gap:32px;flex-wrap:wrap}
.hero-stat label{display:block;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#2a2a2a;margin-bottom:6px}
.hero-stat span{font-family:'DM Serif Display',serif;font-size:36px;color:#e8e3dc}
.hero-email a{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;color:#333;text-decoration:none;transition:color .2s}
.hero-email a:hover{color:#e8e3dc}
.hero-scroll{position:absolute;right:40px;bottom:64px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#1c1c1c;writing-mode:vertical-rl}
section{position:relative;z-index:1}
.section-inner{max-width:1100px;margin:0 auto;padding:88px 40px}
.section-header{margin-bottom:52px}
.section-eyebrow{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#2a2a2a;margin-bottom:16px;display:flex;align-items:center;gap:12px}
.section-eyebrow::before{content:'';width:24px;height:1px;background:#1c1c1c;flex-shrink:0}
.section-title{font-family:'DM Serif Display',serif;font-size:clamp(32px,5vw,60px);line-height:1;letter-spacing:-.02em;color:#e8e3dc}
.section-title .dim{color:#1c1c1c}
.divider{height:1px;background:#0f0f0f}
.projects-grid{display:grid;gap:2px}
.project-card{background:#0d0d0d;border:1px solid #141414;padding:32px 28px;display:grid;grid-template-columns:1fr auto;align-items:start;gap:20px;transition:background .2s;text-decoration:none;color:inherit}
.project-card:hover{background:#111}
.project-number{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;color:#2a2a2a;margin-bottom:14px}
.project-name{font-family:'DM Serif Display',serif;font-size:clamp(20px,3vw,26px);color:#e8e3dc;margin-bottom:10px;line-height:1.1}
.project-desc{font-size:13px;color:#555;line-height:1.72;max-width:520px}
.project-meta{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0}
.project-tag{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;border:1px solid #1c1c1c;border-radius:999px;padding:5px 12px;color:#444;white-space:nowrap}
.project-arrow{width:30px;height:30px;border:1px solid #1c1c1c;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#2a2a2a;transition:border-color .2s,color .2s}
.project-card:hover .project-arrow{border-color:#444;color:#e8e3dc}
.skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2px}
.skill-group{background:#0d0d0d;border:1px solid #141414;padding:26px 22px}
.skill-group-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#2a2a2a;margin-bottom:22px}
.skill-item{margin-bottom:18px}
.skill-item:last-child{margin-bottom:0}
.skill-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:8px}
.skill-name{font-size:14px;color:#e8e3dc}
.skill-meta{display:flex;gap:8px;align-items:center;flex-shrink:0}
.skill-tier{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;color:#2a2a2a;border:1px solid #1c1c1c;border-radius:4px;padding:2px 6px}
.skill-tier.s{border-color:rgba(232,227,220,.3);color:#e8e3dc}
.skill-tier.a{border-color:rgba(232,227,220,.12);color:#777}
.skill-years{font-family:'DM Mono',monospace;font-size:10px;color:#2a2a2a}
.skill-bar-bg{height:2px;background:#161616;border-radius:1px;overflow:hidden}
.skill-bar{height:100%;background:#e8e3dc;border-radius:1px;animation:barFill 1s cubic-bezier(.4,0,.2,1) both}
.exp-list{display:flex;flex-direction:column;gap:2px}
.exp-item{background:#0d0d0d;border:1px solid #141414;padding:26px 28px;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}
.exp-title{font-family:'DM Serif Display',serif;font-size:clamp(18px,2.5vw,22px);color:#e8e3dc;margin-bottom:6px}
.exp-company{font-size:14px;color:#555;margin-bottom:4px}
.exp-location{font-family:'DM Mono',monospace;font-size:11px;color:#2a2a2a;letter-spacing:.08em}
.exp-right{text-align:right;flex-shrink:0}
.exp-period{font-family:'DM Mono',monospace;font-size:11px;color:#444;letter-spacing:.08em;margin-bottom:8px}
.exp-type{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;border:1px solid #1c1c1c;border-radius:999px;padding:4px 10px;color:#444;display:inline-block;white-space:nowrap}
footer{position:relative;z-index:1;border-top:1px solid #0f0f0f;padding:32px 40px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.footer-name{font-family:'DM Serif Display',serif;font-size:15px;color:#e8e3dc}
.footer-copy{font-family:'DM Mono',monospace;font-size:10px;color:#1c1c1c;letter-spacing:.12em;text-transform:uppercase}
.footer-links{display:flex;gap:24px}
.footer-links a{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#2a2a2a;text-decoration:none;transition:color .2s}
.footer-links a:hover{color:#e8e3dc}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s}
.reveal.visible{opacity:1;transform:none}
@media(max-width:900px){nav{padding:14px 24px}.hero{padding:88px 24px 52px}.hero-scroll{display:none}.section-inner{padding:72px 24px}}
@media(max-width:640px){.nav-links{display:none}.hero{padding:80px 16px 44px}.hero-footer{flex-direction:column;gap:24px}.section-inner{padding:60px 16px}.project-card{grid-template-columns:1fr}.exp-item{grid-template-columns:1fr}.exp-right{text-align:left}.skills-grid{grid-template-columns:1fr}footer{flex-direction:column;align-items:flex-start;padding:24px 16px}}
</style>
</head>
<body>
<nav>
  <div class="nav-logo">
    <div class="nav-logo-dot">
      <svg viewBox="0 0 14 14" fill="none" stroke="#080808" stroke-width="2.4" width="10" height="10"><circle cx="7" cy="7" r="3.5"/><circle cx="7" cy="7" r="1" fill="#080808" stroke="none"/></svg>
    </div>
    <span class="nav-name">${firstName.toLowerCase()}${lastName ? "." + lastName.toLowerCase().replace(/\s+/g, "") : ""}</span>
  </div>
  <div class="nav-links">
    <a href="#work">Work</a><a href="#skills">Skills</a><a href="#experience">Experience</a>
    ${data.email ? `<a href="mailto:${data.email}">Contact</a>` : ""}
  </div>
  ${data.openToWork ? `<div class="open-badge"><div class="open-dot"></div>Open to work</div>` : ""}
</nav>
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <div class="hero-eyebrow"><div class="hero-eyebrow-line"></div><span>${data.title}</span></div>
    <h1 class="hero-name">${firstName}${lastName ? `<br><span class="last">${lastName}</span>` : ""}</h1>
  </div>
  <div class="hero-footer">
    <div class="hero-bio">
      <p>${data.bio}</p>
      <div class="hero-stats">
        <div class="hero-stat"><label>Projects</label><span>${data.projects.length}</span></div>
        <div class="hero-stat"><label>Skills</label><span>${data.skills.length}</span></div>
        <div class="hero-stat"><label>Roles</label><span>${data.experience.length}</span></div>
      </div>
    </div>
    ${data.email ? `<div class="hero-email"><a href="mailto:${data.email}">${data.email}</a></div>` : ""}
  </div>
  <div class="hero-scroll">Scroll</div>
</section>
<div class="divider"></div>
<section id="work"><div class="section-inner">
  <div class="section-header reveal"><div class="section-eyebrow">Selected Work</div><h2 class="section-title">Projects<br><span class="dim">& experiments.</span></h2></div>
  <div class="projects-grid">
    ${data.projects
        .map(
            (p, i) => `
    <${p.url ? `a href="${p.url}" target="_blank" rel="noopener"` : "div"} class="project-card reveal" style="animation-delay:${i * 0.08}s">
      <div><div class="project-number">${String(i + 1).padStart(2, "0")}</div><div class="project-name">${p.name}</div><p class="project-desc">${p.description}</p></div>
      <div class="project-meta"><span class="project-tag">${p.status}</span><span class="project-tag">${p.location}</span>${p.url ? `<div class="project-arrow"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" width="10" height="10"><path d="M2 10L10 2M4 2h6v6"/></svg></div>` : ""}</div>
    </${p.url ? "a" : "div"}>
    `,
        )
        .join("")}
  </div>
</div></section>
<div class="divider"></div>
<section id="skills"><div class="section-inner">
  <div class="section-header reveal"><div class="section-eyebrow">Stack</div><h2 class="section-title">Skills &<br><span class="dim">expertise.</span></h2></div>
  <div class="skills-grid">
    ${Object.entries(skillsByCategory)
        .map(
            ([cat, catSkills]) => `
    <div class="skill-group reveal"><div class="skill-group-label">${cat}</div>
      ${catSkills.map((sk) => `<div class="skill-item"><div class="skill-row"><span class="skill-name">${sk.name}</span><div class="skill-meta"><span class="skill-years">${sk.years}</span><span class="skill-tier ${sk.tier.toLowerCase()}">${sk.tier}</span></div></div><div class="skill-bar-bg"><div class="skill-bar" style="width:${sk.proficiency}%;animation-delay:.3s"></div></div></div>`).join("")}
    </div>`,
        )
        .join("")}
  </div>
</div></section>
<div class="divider"></div>
<section id="experience"><div class="section-inner">
  <div class="section-header reveal"><div class="section-eyebrow">Background</div><h2 class="section-title">Experience &<br><span class="dim">history.</span></h2></div>
  <div class="exp-list">
    ${data.experience
        .map(
            (ex, i) => `
    <div class="exp-item reveal" style="animation-delay:${i * 0.1}s">
      <div><div class="exp-title">${ex.title}</div><div class="exp-company">${ex.company}</div><div class="exp-location">${ex.location}</div></div>
      <div class="exp-right"><div class="exp-period">${ex.period}</div><span class="exp-type">${ex.type}</span></div>
    </div>`,
        )
        .join("")}
  </div>
</div></section>
<footer>
  <span class="footer-name">${data.name}</span>
  <span class="footer-copy">Built with makemyfolio</span>
  <div class="footer-links"><a href="#work">Work</a><a href="#skills">Skills</a>${data.email ? `<a href="mailto:${data.email}">Contact</a>` : ""}</div>
</footer>
<script>
const obs=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
</script>
</body></html>`;
}

const preview = `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="280" height="180" fill="#080808"/>
  <!-- grid lines -->
  <line x1="0" y1="40" x2="280" y2="40" stroke="#111" stroke-width=".5"/>
  <line x1="0" y1="80" x2="280" y2="80" stroke="#111" stroke-width=".5"/>
  <line x1="0" y1="120" x2="280" y2="120" stroke="#111" stroke-width=".5"/>
  <line x1="0" y1="160" x2="280" y2="160" stroke="#111" stroke-width=".5"/>
  <line x1="70" y1="0" x2="70" y2="180" stroke="#111" stroke-width=".5"/>
  <line x1="140" y1="0" x2="140" y2="180" stroke="#111" stroke-width=".5"/>
  <line x1="210" y1="0" x2="210" y2="180" stroke="#111" stroke-width=".5"/>
  <!-- nav -->
  <rect width="280" height="22" fill="#0d0d0d"/>
  <circle cx="16" cy="11" r="6" fill="#e8e3dc"/>
  <rect x="28" y="8" width="32" height="5" rx="2" fill="#2a2a2a"/>
  <rect x="190" y="7" width="28" height="7" rx="3" fill="#e8e3dc"/>
  <!-- hero name -->
  <text x="20" y="68" font-family="serif" font-size="28" fill="#e8e3dc" opacity=".9">YOUR</text>
  <text x="44" y="96" font-family="serif" font-size="28" fill="#e8e3dc" opacity=".2">NAME</text>
  <!-- eyebrow line -->
  <line x1="20" y1="42" x2="44" y2="42" stroke="#2a2a2a" stroke-width="1"/>
  <rect x="48" y="39" width="52" height="5" rx="2" fill="#333"/>
  <!-- bio lines -->
  <rect x="20" y="108" width="110" height="3" rx="1" fill="#2a2a2a"/>
  <rect x="20" y="115" width="90" height="3" rx="1" fill="#1c1c1c"/>
  <!-- stats -->
  <text x="20" y="140" font-family="serif" font-size="14" fill="#e8e3dc">12</text>
  <text x="52" y="140" font-family="serif" font-size="14" fill="#e8e3dc">8</text>
  <text x="84" y="140" font-family="serif" font-size="14" fill="#e8e3dc">3</text>
  <rect x="20" y="143" width="16" height="2" rx="1" fill="#1c1c1c"/>
  <rect x="52" y="143" width="16" height="2" rx="1" fill="#1c1c1c"/>
  <rect x="84" y="143" width="16" height="2" rx="1" fill="#1c1c1c"/>
  <!-- project card -->
  <rect x="160" y="100" width="104" height="66" rx="4" fill="#0d0d0d" stroke="#1c1c1c" stroke-width="1"/>
  <rect x="170" y="112" width="40" height="5" rx="2" fill="#2a2a2a"/>
  <rect x="170" y="121" width="70" height="3" rx="1" fill="#1c1c1c"/>
  <rect x="170" y="128" width="55" height="3" rx="1" fill="#1c1c1c"/>
  <rect x="170" y="138" width="30" height="10" rx="5" fill="none" stroke="#2a2a2a" stroke-width="1"/>
  <rect x="206" y="138" width="30" height="10" rx="5" fill="none" stroke="#2a2a2a" stroke-width="1"/>
</svg>`;

export const carbon: Template = {
    id: "carbon",
    name: "Carbon",
    description:
        "Dark architectural. Serif display type, grain texture, numbered projects.",
    tags: ["Dark", "Minimal", "Serif"],
    preview,
    generate,
};
