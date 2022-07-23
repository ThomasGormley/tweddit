import type { CommentsResult, Comment, ChildData } from "./CommentsResult";
import type { Children } from "./reddit";
import { Thread } from "./ThreadsResult";

export type PostProps<TPost = Comment> = {
    post: TPost;
};
export type ReplyPostProps = {
    thread: ChildData;
};

export type DisplayPostProps = {
    type?: "head" | "post" | "reply" | "replyhead";
    post: PostProps["post"];
};

export type PostQuickActions = { type: string; data?: number }[];
