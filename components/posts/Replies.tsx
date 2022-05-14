import React, { Fragment } from "react";
import { Comment } from "../../types/CommentsResult";
import Reply from "./Reply";

export default function Replies({ comments }: { comments: Comment[] }) {
    return (
        <Fragment>
            {comments.map((comment) => {
                return <Reply key={comment.data.id} comment={comment} />;
            })}
        </Fragment>
    );
}
