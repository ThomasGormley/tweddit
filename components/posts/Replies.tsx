import React, { Fragment } from "react";
import { Link } from "../../types/reddit-api/Link";
import Reply from "./Reply";

export default function Replies({ comments }: { comments: Link[] }) {
    return (
        <Fragment>
            {comments.map((comment) => {
                return <Reply key={comment.data.id} comment={comment} />;
            })}
        </Fragment>
    );
}
