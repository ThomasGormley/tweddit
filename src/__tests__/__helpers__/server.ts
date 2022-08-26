import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
    rest.get("https://oauth.reddit.com/.json", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: "test" }));
    }),
];
const server = setupServer(...handlers);

export { server };
