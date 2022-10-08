import { setupServer } from "msw/node";
import { nextAuthHandlers } from "./next-auth";
import { redditHandlers } from "./reddit";

const handlers = [...redditHandlers, ...nextAuthHandlers];
const server = setupServer(...handlers);

export { server };
