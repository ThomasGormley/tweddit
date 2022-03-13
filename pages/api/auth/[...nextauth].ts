import NextAuth from "next-auth";
import config from "../../../lib/config";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: { [key: string]: string }) {
    try {
        const url =
            "https://www.reddit.com/api/v1/access_token?" +
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            } as any);

        const b64String = Buffer.from(
            `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`,
        ).toString("base64");
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${b64String}`,
            },

            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }
        console.log(refreshedTokens);
        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        {
            id: "reddit",
            name: "Reddit",
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            type: "oauth",
            version: "2.0",
            authorization: {
                url: "https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent",
                params: {
                    response_type: "code",
                    duration: "permanent",
                    scope: "identity mysubreddits read vote submit save subscribe history",
                },
            },
            userinfo: "https://oauth.reddit.com/api/v1/me",
            // token: config.urls.api["auth-token"],
            token: "https://www.reddit.com/api/v1/access_token",
            profile: (profile) => {
                return {
                    id: profile.id,
                    name: profile.name,
                };
            },
        },
    ],
    callbacks: {
        async jwt({ token, account, user }: any) {
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_at * 1000,
                    refreshToken: account.refresh_token,
                    user,
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({ session, token }: any) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.error = token.error;

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
});
