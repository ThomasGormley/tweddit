import React, { Fragment } from "react";
import { Comment } from "../../types/reddit-api";
import Reply from "./Reply";

export default function Replies({ comments }: { comments: Comment[] }) {
    console.log({ Replies: comments });
    return (
        <Fragment>
            {comments.map((comment) => {
                return <Reply key={comment.data.id} comment={comment} />;
            })}
        </Fragment>
    );
}
