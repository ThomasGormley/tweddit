const hostname = "http://localhost:3000";
const apiBase = `${hostname}/api`;

const clientId = process.env.REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
const clientSecretB64 = Buffer.from(
    `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`,
).toString("base64");

export default {
    urls: {
        hostname,
        api: {
            base: apiBase,
            auth: `${apiBase}/auth`,
            "auth-token": `${apiBase}/token`,
        },
        reddit: {
            "access-token": "https://www.reddit.com/api/v1/access_token?",
            oauth: "https://oauth.reddit.com",
        },
    },
    reddit: {
        clientId,
        clientSecret,
        clientSecretB64,
    },
} as const;
