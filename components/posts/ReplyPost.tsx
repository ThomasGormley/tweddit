import React, { Fragment } from "react";
import { ReplyPostProps } from "../../types/post";
import RepliesThread from "../RepliesThread";
import DisplayPost from "./DisplayPost";

export default function ReplyPost({ thread }: ReplyPostProps) {
    console.log("thread", thread);
    return (
        <Fragment>
            <DisplayPost type="replyhead" post={thread} />
            {thread.data?.replies?.data && (
                <RepliesThread data={thread.data.replies.data} />
            )}
        </Fragment>
    );
}
