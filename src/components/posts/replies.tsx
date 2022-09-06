import React, { Fragment } from "react";
import { Comment } from "src/types/reddit-api";
import Reply from "./reply";

export default function Replies({ comments }: { comments: Comment[] }) {
    return (
        <Fragment>
            {comments.map((comment) => {
                return <Reply key={comment.data.id} comment={comment} />;
            })}
        </Fragment>
    );
}
