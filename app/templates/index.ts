import { PortfolioData } from "../lib/export";

export interface Template {
    id: string;
    name: string;
    description: string;
    tags: string[];
    // Inline SVG string for the preview card thumbnail
    preview: string;
    // The function that generates the full HTML
    generate: (data: PortfolioData) => string;
}

import { carbon } from "./carbon";
import { mono } from "./mono";

// To add a new template:
//   1. Create app/templates/yourtemplate.ts
//   2. Export a `Template` object from it
//   3. Import it here and add it to this array
export const TEMPLATES: Template[] = [carbon, mono];

export function getTemplate(id: string): Template {
    return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
