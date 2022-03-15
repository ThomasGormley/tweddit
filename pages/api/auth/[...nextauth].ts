import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPublicAccessToken, refreshToken } from "../../../lib/reddit";
import { JWT } from "next-auth/jwt";

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
            profile: (profile) => ({
                id: profile.id,
                name: profile.name,
            }),
        },
        CredentialsProvider({
            id: "anon",
            name: "Anonymous",
            credentials: {},
            async authorize() {
                const token = await getPublicAccessToken();
                return token;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }: any) {
            console.log("token", token);
            console.log("==========");
            console.log("account", account);
            console.log("==========");
            console.log("user", user);
            console.log("==========");
            if (account || (account && user)) {
                switch (account.provider) {
                    case "reddit":
                        return {
                            accessToken: account.access_token,
                            accessTokenExpires:
                                Date.now() + account.expires_at * 1000,
                            refreshToken: account.refresh_token,
                            user,
                        };
                    case "anon":
                        return {
                            accessToken: user.access_token,
                            accessTokenExpires:
                                Date.now() + user.expires_in * 1000,
                        };
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshToken(token);
        },
        async session({ session, token }: { session: any; token: JWT }) {
            session.user = token?.user;
            session.accessToken = token?.accessToken;
            session.accessTokenExpires = token?.accessTokenExpires;
            session.refreshToken = token?.refreshToken;
            session.error = token.error;

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
});
