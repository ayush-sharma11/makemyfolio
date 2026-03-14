import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import dotenv from "dotenv";
import { prisma } from "./app/lib/prisma";

dotenv.config({ path: ".env.local" });

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, profile }) {
            try {
                const p = profile as unknown as {
                    id: number;
                    login: string;
                    name?: string;
                    email?: string;
                    avatar_url?: string;
                };
                await prisma.user.upsert({
                    where: { id: String(p.id) },
                    create: {
                        id: String(p.id),
                        githubUsername: p.login,
                        name: p.name ?? user.name ?? null,
                        email: p.email ?? user.email ?? null,
                        avatarUrl: p.avatar_url ?? user.image ?? null,
                    },
                    update: {
                        githubUsername: p.login,
                        name: p.name ?? user.name ?? null,
                        email: p.email ?? user.email ?? null,
                        avatarUrl: p.avatar_url ?? user.image ?? null,
                        lastSeenAt: new Date(),
                    },
                });
            } catch (err) {
                console.log(`upsert error: ${err}\n`);
            }
            return true;
        },
        jwt({ token, profile }) {
            if (profile) {
                const p = profile as unknown as { login: string; id: number };
                token.sub = String(p.id);
                token.login = p.login;
            }
            return token;
        },
        session({ session, token }) {
            if (token.sub) session.user.id = token.sub;
            if (token.login) session.user.login = token.login as string;
            return session;
        },
    },
});
