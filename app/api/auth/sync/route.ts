import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../lib/prisma";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { githubUsername, name, email, avatarUrl } = await request.json();

    try {
        await prisma.user.upsert({
            where: { id: session.user.id },
            create: {
                id: session.user.id,
                githubUsername: githubUsername ?? "unknown",
                name: name ?? null,
                email: email ?? null,
                avatarUrl: avatarUrl ?? null,
            },
            update: {
                githubUsername: githubUsername ?? "unknown",
                name: name ?? null,
                email: email ?? null,
                avatarUrl: avatarUrl ?? null,
                lastSeenAt: new Date(),
            },
        });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[sync] DB error:", err);
        return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
}
