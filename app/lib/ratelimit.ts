import { prisma } from "@/app/lib/prisma";

export const LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

export async function checkRateLimit(userId: string): Promise<{
    allowed: boolean;
    remaining: number;
    resetAt: number;
}> {
    const now = new Date();
    const resetAt = new Date(Date.now() + WINDOW_MS);

    const entry = await prisma.rateLimit.findUnique({ where: { userId } });

    if (!entry || entry.resetAt < now) {
        await prisma.rateLimit.upsert({
            where: { userId },
            create: { userId, count: 1, resetAt },
            update: { count: 1, resetAt },
        });
        return {
            allowed: true,
            remaining: LIMIT - 1,
            resetAt: resetAt.getTime(),
        };
    }

    if (entry.count >= LIMIT) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: entry.resetAt.getTime(),
        };
    }

    await prisma.rateLimit.update({
        where: { userId },
        data: { count: { increment: 1 } },
    });

    return {
        allowed: true,
        remaining: LIMIT - (entry.count + 1),
        resetAt: entry.resetAt.getTime(),
    };
}
