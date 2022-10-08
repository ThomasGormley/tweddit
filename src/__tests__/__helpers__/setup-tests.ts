import "@testing-library/jest-dom";
import { server } from "mocks";
import "whatwg-fetch";

beforeAll(() => {
    server.listen({
        onUnhandledRequest(req) {
            // console.log(
            //     "Found an unhandled %s request to %s",
            //     req.method,
            //     req.url.href,
            // );
        },
    });
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
