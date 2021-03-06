import { JWT } from "next-auth/jwt";

export async function getPublicAccessToken() {
    try {
        const url =
            "https://www.reddit.com/api/v1/access_token?" +
            new URLSearchParams({
                grant_type: "client_credentials",
                device_id: "DONTTRACKTHISDEVICEPLEASE",
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

        const publicToken = await response.json();

        if (!response.ok) {
            throw publicToken;
        }

        return {
            ...publicToken,
            accessToken: publicToken.access_token,
        };
    } catch (error) {
        console.log(error);

        return {
            message: "PublicAccessTokenError",
            error,
        };
    }
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken(token: JWT) {
    if (!token.refreshToken) {
        const newToken = await getPublicAccessToken();

        return {
            ...token,
            accessToken: newToken.access_token,
        };
    }
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

export async function refreshToken(token: JWT) {
    const isRefreshable = Boolean(token.refreshToken);
    if (isRefreshable) {
        return await refreshAccessToken(token);
    }
    return await getPublicAccessToken();
}
