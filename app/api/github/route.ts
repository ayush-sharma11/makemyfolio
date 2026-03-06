import { NextRequest, NextResponse } from "next/server";

export interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    topics: string[];
    updated_at: string;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    try {
        const [reposRes, userRes] = await Promise.all([
            fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
                {
                    headers: { Accept: "application/vnd.github+json" },
                }
            ),
            fetch(`https://api.github.com/users/${username}`, {
                headers: { Accept: "application/vnd.github+json" },
            }),
        ]);

        if (!reposRes.ok) {
            return NextResponse.json(
                { error: "GitHub user not found" },
                { status: 404 }
            );
        }

        const repos: GithubRepo[] = await reposRes.json();
        const user = await userRes.json();

        return NextResponse.json({
            user: {
                name: user.name,
                bio: user.bio,
                avatar_url: user.avatar_url,
                location: user.location,
                public_repos: user.public_repos,
            },
            repos: repos.map((r) => ({
                id: r.id,
                name: r.name,
                description: r.description,
                html_url: r.html_url,
                language: r.language,
                stars: r.stargazers_count,
                topics: r.topics,
            })),
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch GitHub data" },
            { status: 500 }
        );
    }
}
