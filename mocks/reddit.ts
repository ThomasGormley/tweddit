import config from "src/lib/config";
import type {
    DefaultRequestMultipartBody,
    MockedRequest,
    RestHandler,
} from "msw";
import { rest } from "msw";
import home from "./data/reddit-home.json";

const redditHandlers: Array<
    RestHandler<MockedRequest<DefaultRequestMultipartBody>>
> = [
    rest.get(`${config.urls.reddit.oauth}/.json`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(home));
    }),
];

export { redditHandlers };
