export interface PortfolioData {
    name: string;
    title: string;
    bio: string;
    openToWork: boolean;
    email: string;
    projects: {
        name: string;
        description: string;
        status: string;
        location: string;
        image?: string;
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

const PLACEHOLDER_IMAGES = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
];

export function generatePortfolioHTML(data: PortfolioData): string {
    const firstName = data.name.split(" ")[0].toUpperCase();
    const lastName = data.name.split(" ").slice(1).join(" ").toUpperCase();

    const projectCards = data.projects
        .map(
            (p, i) => `
      <div class="project-card">
        <img src="${
            p.image || PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]
        }" alt="${p.name}" />
        <div class="card-arrow">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
            <path d="M4 12L12 4M5 4h7v7"/>
          </svg>
        </div>
        <div class="card-info">
          <div class="card-name">${p.name}</div>
          <div class="card-meta">
            <span class="card-status">${p.status}</span>
            <span class="card-location">${p.location}</span>
          </div>
        </div>
      </div>`
        )
        .join("");

    const skillRows = data.skills
        .map(
            (s) => `
      <div class="skill-row">
        <div class="skill-info">
          <div class="skill-name">${s.name}</div>
          <div class="skill-category">${s.category}</div>
          <div class="skill-bar-label">Proficiency</div>
          <div class="skill-bar"><div class="skill-bar-fill" data-width="${s.proficiency}"></div></div>
        </div>
        <div class="skill-meta">
          <div><label>Experience</label><span>${s.years}</span></div>
        </div>
        <div class="skill-tier">Tier ${s.tier}</div>
      </div>`
        )
        .join("");

    const experienceRows = data.experience
        .map(
            (e) => `
      <div class="exp-row">
        <div class="exp-info">
          <div class="exp-title">${e.title}</div>
          <div class="exp-meta">${e.company} • ${e.location} • ${e.period}</div>
        </div>
        <span class="exp-badge">${e.type}</span>
      </div>`
        )
        .join("");

    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${data.name} — Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;700;800&display=swap" rel="stylesheet"/>
    <style>
      *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
      :root{--black:#0a0a0a;--dark:#111;--card:#1a1a1a;--border:#2a2a2a;--stone:#666;--white:#f5f5f5}
      html{scroll-behavior:smooth}
      body{background:var(--white);color:var(--black);font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;overflow-x:hidden}
      nav{position:fixed;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:14px 32px;z-index:100;transition:background 0.4s;border-bottom:1px solid transparent}
      nav.scrolled{background:rgba(10,10,10,0.92);backdrop-filter:blur(16px);border-color:rgba(255,255,255,0.07)}
      .nav-logo{display:flex;align-items:center;gap:10px;color:#fff;font-weight:600;font-size:14px;text-decoration:none}
      .nav-logo-icon{width:30px;height:30px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center}
      .hero{position:relative;height:100vh;min-height:620px;background:#111;overflow:hidden}
      .hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(0.42) saturate(0.15)}
      .hero-grid{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.022) 59px,rgba(255,255,255,0.022) 60px)}
      .live-badge{position:absolute;top:80px;right:32px;background:rgba(12,12,12,0.82);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:8px 14px;display:flex;align-items:center;gap:8px;font-size:11px;color:#fff;letter-spacing:0.06em;backdrop-filter:blur(12px)}
      .live-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80;animation:blink 1.8s infinite}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
      .hero-content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:0 32px 56px}
      .hero-eyebrow{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.36);margin-bottom:14px}
      .hero-title{font-family:'Syne',sans-serif;font-size:clamp(72px,11.5vw,148px);font-weight:800;line-height:0.86;color:#fff;letter-spacing:-0.025em}
      .hero-title .indent{padding-left:clamp(36px,5.5vw,72px)}
      .hero-card{position:absolute;right:32px;bottom:56px;width:284px;background:rgba(10,10,10,0.86);border:1px solid rgba(255,255,255,0.09);border-radius:16px;padding:22px 22px 18px;backdrop-filter:blur(20px);z-index:10}
      .hero-card p{font-size:13px;color:rgba(255,255,255,0.65);line-height:1.68;margin-bottom:18px}
      .works{padding:96px 32px 108px;background:var(--white)}
      .works-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:44px}
      .project-card{border-radius:16px;overflow:hidden;position:relative;background:#1a1a1a;aspect-ratio:3/3.5;cursor:pointer}
      .project-card img{width:100%;height:100%;object-fit:cover;filter:brightness(0.78) saturate(0.65);transition:transform 0.7s,filter 0.5s}
      .project-card:hover img{transform:scale(1.06);filter:brightness(0.88) saturate(0.8)}
      .card-arrow{position:absolute;top:14px;right:14px;width:30px;height:30px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:7px;display:flex;align-items:center;justify-content:center;color:#fff}
      .card-info{position:absolute;bottom:0;left:0;right:0;padding:52px 18px 18px;background:linear-gradient(to top,rgba(0,0,0,0.8),transparent)}
      .card-name{font-size:17px;font-weight:600;color:#fff;margin-bottom:6px}
      .card-meta{display:flex;justify-content:space-between}
      .card-status{font-size:11px;color:rgba(255,255,255,0.48);font-style:italic}
      .card-location{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.36)}
      .skills-section{background:var(--black);padding:88px 32px 80px}
      .skills-section h2{font-family:'Syne',sans-serif;font-size:clamp(26px,4vw,40px);font-weight:400;color:#fff;text-align:center;margin-bottom:8px}
      .skill-row{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:18px 22px;display:grid;grid-template-columns:1fr auto auto;gap:18px;align-items:center;margin-bottom:6px;transition:transform 0.3s}
      .skill-row:hover{transform:translateX(5px)}
      .skill-name{font-weight:600;color:#fff;font-size:13px;margin-bottom:2px}
      .skill-category{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#666}
      .skill-bar-label{font-size:9px;letter-spacing:0.1em;color:#666;text-transform:uppercase;margin-top:8px;margin-bottom:4px}
      .skill-bar{height:3px;background:#3a3a3a;border-radius:2px;width:130px;overflow:hidden}
      .skill-bar-fill{height:100%;background:linear-gradient(to right,#444,#aaa);border-radius:2px;width:0%;transition:width 1.3s cubic-bezier(0.22,1,0.36,1)}
      .skill-meta label{font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#666;display:block;margin-bottom:3px}
      .skill-meta span{font-size:12px;color:#bbb}
      .skill-tier{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:#fff}
      .exp-section{background:var(--black);padding:40px 32px 88px;border-top:1px solid #2a2a2a}
      .exp-section h2{font-family:'Syne',sans-serif;font-size:clamp(30px,5vw,52px);font-weight:700;color:#fff;line-height:1;margin-bottom:32px}
      .exp-row{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:16px 18px;display:flex;align-items:center;gap:14px;margin-bottom:8px;transition:transform 0.3s}
      .exp-row:hover{transform:translateX(6px)}
      .exp-info{flex:1}
      .exp-title{font-weight:600;color:#fff;font-size:13px}
      .exp-meta{font-size:11px;color:#666;margin-top:2px}
      .exp-badge{font-size:10px;border:1px solid #3a3a3a;border-radius:999px;padding:3px 10px;color:#999}
      footer{background:var(--black);padding:56px 32px 32px}
      .footer-copy{font-size:11px;color:#666;text-align:center;padding-top:28px;border-top:1px solid #2a2a2a}
    </style>
  </head>
  <body>
    <nav id="navbar">
      <a href="#" class="nav-logo">
        <div class="nav-logo-icon">
          <svg viewBox="0 0 16 16" fill="none" stroke="#000" stroke-width="2.2" width="16" height="16">
            <circle cx="8" cy="8" r="4.5"/><circle cx="8" cy="8" r="1.4" fill="#000" stroke="none"/>
          </svg>
        </div>
        ${data.name}
      </a>
    </nav>
  
    <section class="hero">
      <div class="hero-bg" style="background-image:url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=85')"></div>
      <div class="hero-grid"></div>
      ${
          data.openToWork
              ? `<div class="live-badge"><div class="live-dot"></div> OPEN TO WORK</div>`
              : ""
      }
      <div class="hero-content">
        <p class="hero-eyebrow">${data.title}</p>
        <h1 class="hero-title">
          ${firstName}${
        lastName ? `<br/><span class="indent">${lastName}</span>` : ""
    }
        </h1>
      </div>
      <div class="hero-card">
        <p>${data.bio}</p>
      </div>
    </section>
  
    <section class="works">
      <h2 style="font-family:'Syne',sans-serif;font-size:clamp(34px,5vw,58px);font-weight:700;margin-bottom:40px;color:#0a0a0a">Selected Works.</h2>
      <div class="works-grid">${projectCards}</div>
    </section>
  
    <section class="skills-section">
      <h2>Technical Stack</h2>
      <p style="font-size:13px;color:#666;text-align:center;margin-bottom:40px">Tools I reach for first.</p>
      <div style="max-width:860px;margin:0 auto">${skillRows}</div>
    </section>
  
    <section class="exp-section">
      <h2>Where I've Been.</h2>
      ${experienceRows}
    </section>
  
    <footer>
      <div class="footer-copy">© ${new Date().getFullYear()} ${
        data.name
    }. All rights reserved.</div>
    </footer>
  
    <script>
      const nav = document.getElementById('navbar');
      window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-bar-fill').forEach(b => {
              setTimeout(() => b.style.width = b.dataset.width + '%', 350);
            });
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.25 });
      document.querySelectorAll('.skill-row').forEach(r => obs.observe(r));
    </script>
  </body>
  </html>`;
}

export function downloadHTML(html: string, filename = "portfolio.html") {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
