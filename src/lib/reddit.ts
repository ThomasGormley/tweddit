import { JWT } from "next-auth/jwt";
import config from "src/lib/config";

const options = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${config.reddit.clientSecretB64}`,
    },
    method: "POST",
};

/**
 * Returns a new token with anon `accessToken`. If an error occurs,
 * returns the an error property
 */
export async function getPublicAccessToken() {
    try {
        const url = new URL(config.urls.reddit["access-token"]);
        url.searchParams.append("grant_type", "client_credentials");
        url.searchParams.append("device_id", "DONTTRACKTHISDEVICEPLEASE");

        const response = await fetch(url, options);
        const publicToken = await response.json();

        if (!response.ok) {
            throw publicToken;
        }

        return {
            ...publicToken,
            accessToken: publicToken.access_token,
        };
    } catch (error) {
        console.error(error);

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
        const url = new URL(config.urls.reddit["access-token"]);
        url.searchParams.append("grant_type", "refresh_token");
        url.searchParams.append("refresh_token", token.refreshToken);

        const response = await fetch(url, options);
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

export async function fetchRedditQueryFn<ApiReturnType>(
    path: string,
    accessToken: string,
    after?: string,
) {
    const url = new URL(path, config.urls.reddit.oauth);

    if (after) {
        url.searchParams.append("after", after);
    }

    const headers = new Headers({
        Authorization: `bearer ${accessToken}`,
    });

    const res = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    const json = await res.json();

    if (json instanceof Array) {
        return json as Array<ApiReturnType>;
    }

    return [json] as Array<ApiReturnType>;
}
