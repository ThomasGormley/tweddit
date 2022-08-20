import React, { Fragment } from "react";
import { Link } from "@types/reddit-api/Link";
import Post from "./Post";

type PostsProps = {
    data: Array<Link>;
};

export default function PostsList({ data }: PostsProps) {
    return (
        <Fragment>
            {data.map((post) => (
                <Post key={post.data.id} post={post} />
            ))}
        </Fragment>
    );
}
