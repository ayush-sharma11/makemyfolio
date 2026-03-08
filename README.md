# makemyfolio

An AI-powered portfolio generator. Paste your GitHub username, pick your best projects, fill in your details - Gemini rewrites everything into sharp, minimal copy. Download a single self-contained HTML file and host it anywhere.

**[Live Demo](https://makemyfolio.vercel.app)** · **[Generate yours](https://makemyfolio.vercel.app/generate)**

![makemyfolio preview](https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80&auto=format)

---

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

## Project structure

```
app/
├── page.tsx                  # Landing page
├── generate/
│   └── page.tsx              # 4-step generator UI
├── api/
│   ├── github/route.ts       # Fetches GitHub user + repos
│   └── generate/route.ts     # Calls Gemini, returns rewritten content
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Works.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   └── Footer.tsx
└── lib/
    └── export.ts             # Generates + downloads self-contained HTML
```

---

## Testing the AI prompt

You can test the Gemini prompt without running the full Next.js server:

```bash
GOOGLE_API_KEY=your_key node test-generate.mjs
```

Edit the mock input at the top of `test-generate.mjs` to test different inputs.

---

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Add `GOOGLE_API_KEY` in your Vercel project settings under **Environment Variables**.

---

## Output

The downloaded `portfolio.html` is:

- Fully self-contained - no build step, no dependencies
- Responsive across all screen sizes
- Dark by default with grain texture and scroll-reveal animations
- Sections: Hero, Projects, Skills (with S/A/B tiers), Experience
- Custom favicon support or default makemyfolio favicon
- "Built with makemyfolio" credit in the footer

---

## License

MIT
