import type {
    DefaultRequestMultipartBody,
    MockedRequest,
    RestHandler,
} from "msw";
import { rest } from "msw";

const nextAuthHandlers: Array<
    RestHandler<MockedRequest<DefaultRequestMultipartBody>>
> = [
    rest.get("/api/auth/session", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                expires: "2022-11-07T18:21:48.104Z",
                accessToken: "-qjpJMMnkdS4zUr6MtVi3WxQOaaYw7A",
            }),
        );
    }),
];

export { nextAuthHandlers };
