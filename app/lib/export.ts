export interface PortfolioData {
    name: string;
    title: string;
    bio: string;
    openToWork: boolean;
    email: string;
    favicon?: string;
    projects: {
        name: string;
        description: string;
        status: string;
        location: string;
        url?: string;
    }[];
    skills: {
        name: string;
        category: string;
        years: string;
        proficiency: number;
        tier: string;
    }[];
    experience: {
        title: string;
        company: string;
        location: string;
        type: string;
        period: string;
    }[];
}

const DEFAULT_FAVICON = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23e8e3dc'/><circle cx='16' cy='16' r='7' fill='none' stroke='%23080808' stroke-width='2.5'/><circle cx='16' cy='16' r='2.5' fill='%23080808'/></svg>`;

export function generatePortfolioHTML(data: PortfolioData): string {
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
<link rel="icon" href="${faviconHref}" />
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

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:16px 40px;border-bottom:1px solid #111;background:rgba(8,8,8,.9);backdrop-filter:blur(20px);gap:16px}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
.nav-logo-dot{width:24px;height:24px;border-radius:50%;background:#e8e3dc;display:flex;align-items:center;justify-content:center}
.nav-name{font-family:'DM Serif Display',serif;font-size:16px;color:#e8e3dc;letter-spacing:-.01em}
.nav-links{display:flex;gap:28px}
.nav-links a{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#444;text-decoration:none;transition:color .2s}
.nav-links a:hover{color:#e8e3dc}
.open-badge{display:flex;align-items:center;gap:8px;border:1px solid #1c1c1c;border-radius:999px;padding:6px 14px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#555;flex-shrink:0}
.open-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80;animation:blink 2s infinite;flex-shrink:0}

/* HERO */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:100px 40px 64px;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%,rgba(232,227,220,.04) 0%,transparent 60%)}
.hero-content{position:relative;z-index:2;animation:fadeUp .9s .1s both}
.hero-eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:28px}
.hero-eyebrow-line{width:32px;height:1px;background:#2a2a2a;flex-shrink:0}
.hero-eyebrow span{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#444}
.hero-name{font-family:'DM Serif Display',serif;font-size:clamp(64px,12vw,160px);font-weight:400;line-height:.88;letter-spacing:-.02em;color:#e8e3dc;margin-bottom:48px}
.hero-name .last{padding-left:clamp(28px,5vw,72px);color:rgba(232,227,220,.18)}
.hero-footer{display:flex;align-items:flex-end;justify-content:space-between;position:relative;z-index:2;animation:fadeUp .7s .35s both;gap:32px;flex-wrap:wrap}
.hero-bio{max-width:440px}
.hero-bio p{font-size:15px;color:#555;line-height:1.78;margin-bottom:24px}
.hero-stats{display:flex;gap:32px;flex-wrap:wrap}
.hero-stat label{display:block;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#2a2a2a;margin-bottom:6px}
.hero-stat span{font-family:'DM Serif Display',serif;font-size:36px;color:#e8e3dc}
.hero-email a{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;color:#333;text-decoration:none;transition:color .2s}
.hero-email a:hover{color:#e8e3dc}
.hero-scroll{position:absolute;right:40px;bottom:64px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#1c1c1c;writing-mode:vertical-rl}

/* SECTIONS */
section{position:relative;z-index:1}
.section-inner{max-width:1100px;margin:0 auto;padding:88px 40px}
.section-header{margin-bottom:52px}
.section-eyebrow{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#2a2a2a;margin-bottom:16px;display:flex;align-items:center;gap:12px}
.section-eyebrow::before{content:'';width:24px;height:1px;background:#1c1c1c;flex-shrink:0}
.section-title{font-family:'DM Serif Display',serif;font-size:clamp(32px,5vw,60px);line-height:1;letter-spacing:-.02em;color:#e8e3dc}
.section-title .dim{color:#1c1c1c}
.divider{height:1px;background:#0f0f0f}

/* PROJECTS */
.projects-grid{display:grid;gap:2px}
.project-card{background:#0d0d0d;border:1px solid #141414;padding:32px 28px;display:grid;grid-template-columns:1fr auto;align-items:start;gap:20px;transition:background .2s;text-decoration:none;color:inherit}
.project-card:hover{background:#111}
.project-number{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;color:#2a2a2a;margin-bottom:14px}
.project-name{font-family:'DM Serif Display',serif;font-size:clamp(20px,3vw,26px);color:#e8e3dc;margin-bottom:10px;line-height:1.1}
.project-desc{font-size:13px;color:#555;line-height:1.72;max-width:520px}
.project-meta{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0}
.project-tag{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;border:1px solid #1c1c1c;border-radius:999px;padding:5px 12px;color:#444;white-space:nowrap}
.project-arrow{width:30px;height:30px;border:1px solid #1c1c1c;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#2a2a2a;transition:border-color .2s,color .2s;flex-shrink:0}
.project-card:hover .project-arrow{border-color:#444;color:#e8e3dc}

/* SKILLS */
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

/* EXPERIENCE */
.exp-list{display:flex;flex-direction:column;gap:2px}
.exp-item{background:#0d0d0d;border:1px solid #141414;padding:26px 28px;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}
.exp-title{font-family:'DM Serif Display',serif;font-size:clamp(18px,2.5vw,22px);color:#e8e3dc;margin-bottom:6px}
.exp-company{font-size:14px;color:#555;margin-bottom:4px}
.exp-location{font-family:'DM Mono',monospace;font-size:11px;color:#2a2a2a;letter-spacing:.08em}
.exp-right{text-align:right;flex-shrink:0}
.exp-period{font-family:'DM Mono',monospace;font-size:11px;color:#444;letter-spacing:.08em;margin-bottom:8px}
.exp-type{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;border:1px solid #1c1c1c;border-radius:999px;padding:4px 10px;color:#444;display:inline-block;white-space:nowrap}

/* FOOTER */
footer{position:relative;z-index:1;border-top:1px solid #0f0f0f;padding:32px 40px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.footer-name{font-family:'DM Serif Display',serif;font-size:15px;color:#e8e3dc}
.footer-copy{font-family:'DM Mono',monospace;font-size:10px;color:#1c1c1c;letter-spacing:.12em;text-transform:uppercase}
.footer-links{display:flex;gap:24px}
.footer-links a{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#2a2a2a;text-decoration:none;transition:color .2s}
.footer-links a:hover{color:#e8e3dc}

/* REVEAL */
.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s}
.reveal.visible{opacity:1;transform:none}

/* RESPONSIVE */
@media(max-width:900px){
  nav{padding:14px 24px}
  .nav-links{gap:20px}
  .hero{padding:88px 24px 52px}
  .hero-scroll{display:none}
  .section-inner{padding:72px 24px}
  .project-card{padding:24px 20px}
  .exp-item{padding:20px 22px}
  footer{padding:28px 24px}
}
@media(max-width:640px){
  nav{padding:12px 16px}
  .nav-links{display:none}
  .open-badge{padding:6px 12px;font-size:9px}
  .hero{padding:80px 16px 44px}
  .hero-footer{flex-direction:column;align-items:flex-start;gap:24px}
  .hero-bio p{font-size:14px}
  .section-inner{padding:60px 16px}
  .project-card{grid-template-columns:1fr;padding:20px 16px}
  .project-meta{flex-direction:row;align-items:center;flex-wrap:wrap}
  .exp-item{grid-template-columns:1fr;padding:18px 16px}
  .exp-right{text-align:left}
  .skills-grid{grid-template-columns:1fr}
  footer{padding:24px 16px;flex-direction:column;align-items:flex-start;gap:12px}
  .footer-links{gap:16px}
}
</style>
</head>
<body>

<nav>
  <div class="nav-logo">
    <div class="nav-logo-dot">
      <svg viewBox="0 0 14 14" fill="none" stroke="#080808" stroke-width="2.4" width="10" height="10">
        <circle cx="7" cy="7" r="3.5"/><circle cx="7" cy="7" r="1" fill="#080808" stroke="none"/>
      </svg>
    </div>
    <span class="nav-name">${firstName.toLowerCase()}${lastName ? "." + lastName.toLowerCase().replace(/\s+/g, "") : ""}</span>
  </div>
  <div class="nav-links">
    <a href="#work">Work</a>
    <a href="#skills">Skills</a>
    <a href="#experience">Experience</a>
    ${data.email ? `<a href="mailto:${data.email}">Contact</a>` : ""}
  </div>
  ${data.openToWork ? `<div class="open-badge"><div class="open-dot"></div>Open to work</div>` : ""}
</nav>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">
      <div class="hero-eyebrow-line"></div>
      <span>${data.title}</span>
    </div>
    <h1 class="hero-name">
      ${firstName}${lastName ? `<br><span class="last">${lastName}</span>` : ""}
    </h1>
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

<section id="work">
  <div class="section-inner">
    <div class="section-header reveal">
      <div class="section-eyebrow">Selected Work</div>
      <h2 class="section-title">Projects<br><span class="dim">& experiments.</span></h2>
    </div>
    <div class="projects-grid">
      ${data.projects
          .map(
              (p, i) => `
      <${p.url ? `a href="${p.url}" target="_blank" rel="noopener"` : "div"} class="project-card reveal" style="animation-delay:${i * 0.08}s">
        <div>
          <div class="project-number">${String(i + 1).padStart(2, "0")}</div>
          <div class="project-name">${p.name}</div>
          <p class="project-desc">${p.description}</p>
        </div>
        <div class="project-meta">
          <span class="project-tag">${p.status}</span>
          <span class="project-tag">${p.location}</span>
          ${p.url ? `<div class="project-arrow"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" width="10" height="10"><path d="M2 10L10 2M4 2h6v6"/></svg></div>` : ""}
        </div>
      </${p.url ? "a" : "div"}>
      `,
          )
          .join("")}
    </div>
  </div>
</section>

<div class="divider"></div>

<section id="skills">
  <div class="section-inner">
    <div class="section-header reveal">
      <div class="section-eyebrow">Stack</div>
      <h2 class="section-title">Skills &<br><span class="dim">expertise.</span></h2>
    </div>
    <div class="skills-grid">
      ${Object.entries(skillsByCategory)
          .map(
              ([cat, catSkills]) => `
      <div class="skill-group reveal">
        <div class="skill-group-label">${cat}</div>
        ${catSkills
            .map(
                (sk) => `
        <div class="skill-item">
          <div class="skill-row">
            <span class="skill-name">${sk.name}</span>
            <div class="skill-meta">
              <span class="skill-years">${sk.years}</span>
              <span class="skill-tier ${sk.tier.toLowerCase()}">${sk.tier}</span>
            </div>
          </div>
          <div class="skill-bar-bg"><div class="skill-bar" style="width:${sk.proficiency}%;animation-delay:.3s"></div></div>
        </div>
        `,
            )
            .join("")}
      </div>
      `,
          )
          .join("")}
    </div>
  </div>
</section>

<div class="divider"></div>

<section id="experience">
  <div class="section-inner">
    <div class="section-header reveal">
      <div class="section-eyebrow">Background</div>
      <h2 class="section-title">Experience &<br><span class="dim">history.</span></h2>
    </div>
    <div class="exp-list">
      ${data.experience
          .map(
              (ex, i) => `
      <div class="exp-item reveal" style="animation-delay:${i * 0.1}s">
        <div>
          <div class="exp-title">${ex.title}</div>
          <div class="exp-company">${ex.company}</div>
          <div class="exp-location">${ex.location}</div>
        </div>
        <div class="exp-right">
          <div class="exp-period">${ex.period}</div>
          <span class="exp-type">${ex.type}</span>
        </div>
      </div>
      `,
          )
          .join("")}
    </div>
  </div>
</section>

<footer>
  <span class="footer-name">${data.name}</span>
  <span class="footer-copy">Built with mkfolio</span>
  <div class="footer-links">
    <a href="#work">Work</a>
    <a href="#skills">Skills</a>
    ${data.email ? `<a href="mailto:${data.email}">Contact</a>` : ""}
  </div>
</footer>

<script>
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
</script>
</body>
</html>`;
}

export function downloadHTML(html: string, filename: string) {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
