import { OAuthConfig } from 'next-auth/providers';

export const StravaProvider: OAuthConfig<any> = {
    id: 'strava',
    name: 'Strava',
    type: 'oauth',
    authorization: {
        url: 'https://www.strava.com/oauth/authorize',
        params: {
            scope: 'read,activity:read,activity:read_all,profile:read_all',
            approval_prompt: 'auto',
            response_type: 'code',
        },
    },
    token: {
        url: 'https://www.strava.com/oauth/token',
    },
    userinfo: {
        url: 'https://www.strava.com/api/v3/athlete',
    },
    profile(profile) {
        return {
            id: profile.id.toString(),
            name: `${profile.firstname} ${profile.lastname}`,
            email: null, // Strava doesn't provide email
            image: profile.profile,
            stravaId: profile.id.toString(),
            stravaAccessToken: profile.access_token,
            stravaRefreshToken: profile.refresh_token,
            stravaTokenExpiresAt: profile.expires_at,
        };
    },
    clientId: process.env.STRAVA_CLIENT_ID!,
    clientSecret: process.env.STRAVA_CLIENT_SECRET!,
}; 