import React, { Fragment } from "react";
import { Comment } from "../../types/CommentsResult";
import RepliesThread from "../RepliesThread";
import ReplyHeadPost from "./ReplyHeadPost";

export default function Replies({ comments }: { comments: Comment[] }) {
    console.log({ comments });
    return (
        <Fragment>
            {comments.map((comment) => {
                return (
                    <Fragment key={comment.data.id}>
                        <ReplyHeadPost post={comment} />
                        {comment.data?.replies?.data && (
                            <RepliesThread data={comment.data.replies.data} />
                        )}
                    </Fragment>
                );
            })}
        </Fragment>
    );

    // return (

    //     <Fragment>
    //         <ReplyHeadPost post={thread} />
    //         {thread.data?.replies?.data && (
    //             <RepliesThread data={thread.data.replies.data} />
    //         )}
    //     </Fragment>
    // );
}
