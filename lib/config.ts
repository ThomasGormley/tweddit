const hostname = "http://localhost:3000";
const apiBase = `${hostname}/api`;

export default {
    urls: {
        hostname,
        api: {
            base: apiBase,
            auth: `${apiBase}/auth`,
            "auth-token": `${apiBase}/token`,
        },
    },
};
