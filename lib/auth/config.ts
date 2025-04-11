import { NextAuthConfig } from 'next-auth';
import { StravaProvider } from './providers/strava';

export const authConfig = {
    providers: [StravaProvider],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                return {
                    ...token,
                    stravaId: profile.stravaId,
                    stravaAccessToken: profile.stravaAccessToken,
                    stravaRefreshToken: profile.stravaRefreshToken,
                    stravaTokenExpiresAt: profile.stravaTokenExpiresAt,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    stravaId: token.stravaId,
                    stravaAccessToken: token.stravaAccessToken,
                },
            };
        },
    },
    pages: {
        signIn: '/sign-in',
    },
} satisfies NextAuthConfig; 