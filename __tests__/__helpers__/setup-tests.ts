import "@testing-library/jest-dom";
import "next";
import { server } from "./server";

beforeAll(() =>
    server.listen({
        onUnhandledRequest(req) {
            console.error(
                "Found an unhandled %s request to %s",
                req.method,
                req.url.href,
            );
        },
    }),
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
