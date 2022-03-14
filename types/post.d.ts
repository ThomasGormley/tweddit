import type { Children } from "./reddit";

export type PostProps = {
    post: Children;
};

export type DisplayPostProps = {
    type?: "head" | "post" | "reply";
    post: PostProps["post"];
};

export type PostQuickActions = { type: string; data?: number }[];
