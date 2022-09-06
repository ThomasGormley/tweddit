import type { Link, Comment, LinkData } from "./reddit-api/link";
import type { Children } from "./reddit";
import { CommentDataChildren } from "./reddit-api/comment";

export type PostProps<TPost = Comment> = {
    post: TPost;
};
export type ReplyPostProps = {
    thread: LinkData;
};

export type DisplayPostProps = {
    type?: "head" | "post" | "reply" | "replyhead";
    post: PostProps["post"];
};

export type PostQuickActions = { type: string; data?: number }[];
