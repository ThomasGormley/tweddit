import React, { Fragment } from "react";
import { isCommentType } from "../lib/predicates";
import { More } from "../types/reddit-api";
import { Comment } from "../types/reddit-api/comment";
import { ListingData } from "../types/reddit-api/listing";
import Post from "./posts/post";
import { ShowReplies } from "./show-replies";

type ThreadProps = {
    data: ListingData<Comment | More>;
};

export default function RepliesThread({ data }: ThreadProps) {
    const commentArray = data.children.filter(isCommentType);
    return (
        <Fragment>
            {commentArray
                .sort((a, b) => b.data.ups - a.data.ups)
                .map((post, i: number) => {
                    const hasReplies = Boolean(post.data.replies);
                    if (i == 0) {
                        return (
                            <Fragment key={post.data.id}>
                                <Post post={post} />
                                {hasReplies && (
                                    <ShowReplies
                                        data={
                                            post.data.replies
                                                .data as ListingData<
                                                Comment | More
                                            >
                                        }
                                    />
                                )}
                            </Fragment>
                        );
                    }

                    // TODO: if kind is more -> GET request on the ID to fetch replies
                    // if data.children[0].data.children is a string need to do fetch, possibly handle in ShowReplies component
                    // if (post.kind === "more") {
                    //     return (
                    //         <ShowReplies
                    //             data={data.children[0].data.replies?.data}
                    //         />
                    //     );
                    // }
                })}
        </Fragment>
    );
}
