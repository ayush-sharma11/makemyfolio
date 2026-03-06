import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export interface GenerateRequest {
    name: string;
    title: string;
    bio: string;
    openToWork: boolean;
    skills: {
        name: string;
        category: string;
        years: string;
        proficiency: number;
    }[];
    projects: {
        name: string;
        description: string;
        url: string;
        language: string | null;
    }[];
    experience: {
        title: string;
        company: string;
        location: string;
        type: string;
        period: string;
    }[];
}

export interface GenerateResponse {
    bio: string;
    title: string;
    projects: {
        name: string;
        description: string;
        status: string;
        location: string;
    }[];
    skills: {
        name: string;
        category: string;
        years: string;
        proficiency: number;
        tier: string;
    }[];
}

function buildPrompt(body: GenerateRequest): string {
    return `
You are a professional copywriter specializing in developer portfolios. Your job is to transform raw, unpolished input into sharp, confident, minimal portfolio copy.

═══════════════════════════════════════════
TONE GUIDE — READ THIS CAREFULLY
═══════════════════════════════════════════
The portfolio uses a dark, minimal, architectural aesthetic. The copy must match:
- SHORT sentences. No filler.
- Confident, not arrogant. Let the work speak.
- First-person or implied first-person only.
- NEVER use these words: passionate, leverage, dynamic, synergy, innovative, results-driven, detail-oriented, hard-working, team player, self-starter, go-getter, guru, ninja, rockstar, wizard.
- NEVER start the bio with "I am a..." or "I'm a..." — this is clichéd.
- DO NOT invent fake achievements, companies, awards, or projects the user has not mentioned.
- Keep technical terms accurate. If someone says "React", say "React", not "JavaScript frameworks".

═══════════════════════════════════════════
WHAT GOOD COPY LOOKS LIKE — EXAMPLES
═══════════════════════════════════════════
BAD bio: "I am a passionate full-stack developer with 3 years of experience who loves building innovative web applications."
GOOD bio: "Three years building web products that people actually use. I care about the gap between design and engineering — the part most developers skip."

BAD bio: "I'm a self-motivated software engineer skilled in React, Node.js, and AWS who is passionate about delivering high-quality solutions."
GOOD bio: "Software engineer with a bias for shipping. React and Node.js on most days. AWS when things need to scale."

BAD project description: "A web application that leverages modern technologies to provide users with an innovative solution for managing their tasks efficiently."
GOOD project description: "A fast, offline-first task manager. No accounts, no sync, just a list that works."

BAD project description: "Built using React and TypeScript to dynamically render data from an API."
GOOD project description: "GitHub stats dashboard. Pulls live data, renders in under 200ms."

═══════════════════════════════════════════
INPUT DATA
═══════════════════════════════════════════
Name: ${body.name}
Current title: ${body.title}
Bio (raw, may be rough): ${
        body.bio || "Not provided — infer from their skills and experience."
    }

Skills: ${body.skills
        .map((s) => `${s.name} (${s.category}, ${s.years})`)
        .join(", ")}

Projects:
${body.projects
    .map(
        (p, i) => `  ${i + 1}. ${p.name}${p.language ? ` [${p.language}]` : ""}
     Description: ${
         p.description ||
         "No description provided — write something plausible based on the repo name and language."
     }
     URL: ${p.url}`
    )
    .join("\n")}

Work experience:
${body.experience
    .map(
        (e, i) =>
            `  ${i + 1}. ${e.title} at ${e.company} (${e.location}, ${
                e.period
            }, ${e.type})`
    )
    .join("\n")}

═══════════════════════════════════════════
YOUR TASK
═══════════════════════════════════════════
Rewrite the above into polished portfolio copy following the tone guide strictly.

For the bio: 2-3 sentences max. Sharp, direct, specific. Reference their actual stack or domain if it helps.

For the title: Refine it to max 4 words. Keep it accurate to their actual role. Examples: "Frontend Engineer", "Full-Stack Developer", "Software Engineer", "UI Engineer & Designer".

For each project: Write ONE punchy sentence (max 15 words) that says what it does and why it exists. Be specific. If no description was given, infer from the repo name and language — but keep it grounded, not fabricated.

For each skill: Assign a tier based on years and proficiency:
- Tier S: proficiency >= 85 AND years >= 3
- Tier A: proficiency >= 65 OR years >= 2
- Tier B: everything else

For each project status, pick the most accurate:
- "Shipped" — it is complete and deployed
- "In Progress" — actively being built
- "Open Source" — public repo, community focus
- "Archived" — no longer maintained

For each project location, pick:
- "GitHub" — personal or open source
- "Work" — built professionally
- "Personal" — personal project not on GitHub

═══════════════════════════════════════════
OUTPUT FORMAT — CRITICAL
═══════════════════════════════════════════
Return ONLY a valid JSON object.
No markdown. No backticks. No code fences. No explanation. No text before or after the JSON.
Start your response with { and end with }

The JSON must match this exact structure:
{
  "bio": "string — 2-3 sentences, sharp and direct",
  "title": "string — max 4 words",
  "projects": [
    {
      "name": "string — exact repo name, unchanged",
      "description": "string — one punchy sentence, max 15 words",
      "status": "Shipped | In Progress | Open Source | Archived",
      "location": "GitHub | Work | Personal"
    }
  ],
  "skills": [
    {
      "name": "string — exact skill name, unchanged",
      "category": "Frontend | Backend | Language | DevOps | Design | Other",
      "years": "string — e.g. 2 yrs",
      "proficiency": number between 0 and 100,
      "tier": "S | A | B"
    }
  ]
}

IMPORTANT: Output must contain exactly ${
        body.projects.length
    } project(s) and exactly ${
        body.skills.length
    } skill(s). Do not add or remove any items.
`.trim();
}

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();

        if (!body.name || !body.skills?.length || !body.projects?.length) {
            return NextResponse.json(
                { error: "Missing required fields: name, skills, or projects" },
                { status: 400 }
            );
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: buildPrompt(body),
            config: {
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 2048,
            },
        });

        const raw = (response.text ?? "").trim();

        // Strip any accidental markdown fences Gemini sometimes adds
        const cleaned = raw
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        let parsed: GenerateResponse;
        try {
            parsed = JSON.parse(cleaned);
        } catch {
            console.error("Gemini returned non-JSON:", cleaned);
            return NextResponse.json(
                { error: "AI returned invalid format. Please try again." },
                { status: 500 }
            );
        }

        // Basic shape validation
        if (
            !parsed.bio ||
            !parsed.title ||
            !Array.isArray(parsed.projects) ||
            !Array.isArray(parsed.skills)
        ) {
            return NextResponse.json(
                { error: "AI response was incomplete. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(parsed);
    } catch (err) {
        console.error("Generate error:", err);
        return NextResponse.json(
            {
                error: "Failed to generate portfolio content. Please try again.",
            },
            { status: 500 }
        );
    }
}
