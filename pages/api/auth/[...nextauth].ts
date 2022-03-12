import NextAuth from "next-auth";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        {
            id: "reddit",
            name: "Reddit",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            type: "oauth",
            version: "2.0",
            authorization: {
                url: "https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent",
                params: {
                    grant_type: "authorization_code",
                    scope: "identity mysubreddits read vote submit save subscribe history",
                },
            },
            accessTokenUrl: "https://www.reddit.com/api/v1/access_token",
            profileUrl: "https://oauth.reddit.com/api/v1/me",
            profile: (profile) => {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: null,
                };
            },
        },
    ],
});
