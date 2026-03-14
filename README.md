# makemyfolio

An AI-powered portfolio generator. Paste your GitHub username, pick your best projects, fill in your details - Gemini rewrites everything into sharp, minimal copy. Download a single self-contained HTML file and host it anywhere.

## How it works

1. **Connect GitHub** - enter your username, we fetch your repos automatically
2. **Pick projects** - select up to 6 repos to feature on your portfolio
3. **Fill details** - name, bio, skills, experience, optional favicon
4. **Generate** - Gemini rewrites everything into clean, minimal copy
5. **Download** - get a single `portfolio.html` file, host it anywhere

---

## Stack

- **Framework** - Next.js 15 (App Router)
- **Language** - TypeScript
- **AI** - Google Gemini 2.5 Flash via `@google/genai`
- **Data** - GitHub REST API (no auth required for public repos)
- **Styling** - inline styles + CSS-in-JS (no Tailwind, no external CSS)
- **Fonts** - DM Serif Display, DM Mono, Outfit via `next/font/google`
- **Deploy** - Vercel

---

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/makemyfolio.git
cd makemyfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a Gemini API key

- Go to [aistudio.google.com](https://aistudio.google.com)
- Click **Get API Key** → **Create API key**
- Free tier: 250 requests/day, no credit card needed

### 4. Add environment variables

Create a `.env.local` file in the root:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Output

The downloaded `portfolio.html` is:

- Fully self-contained — no build step, no dependencies
- Responsive across all screen sizes
- Dark by default with grain texture and scroll-reveal animations
- Sections: Hero, Projects, Skills (with S/A/B tiers), Experience
- Custom favicon support or default makemyfolio favicon
- "Built with makemyfolio" credit in the footer

The downloaded `resume.pdf` is:

- Clean, recruiter-friendly A4 white resume
- Sections: Bio, Experience, Projects, Skills grouped by category
- Generated client-side via jsPDF — no server, no upload

---

## License

MIT
