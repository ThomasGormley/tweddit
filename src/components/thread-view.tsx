import React, { Fragment } from "react";
import { Comment } from "../types/reddit-api/comment";
import Replies from "./posts/replies";
import HeadPost from "./posts/head-post";
import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import LoadingSpinner from "./loading-spinner";
import Banner from "./banner";
import { Link, Listing, More } from "../types/reddit-api";
import { isCommentType } from "../lib/predicates";

export default function ThreadView() {
    const router = useRouter();

    const { data, isLoading } = useRedditQuery<Listing<Link>>();

    if (isLoading || !data) {
        return (
            <div className="flex w-full justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    console.log({ ThreadViewQueryData: data });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [headPostData, commentsData]: [
        Listing<Link>,
        Listing<Comment | More>,
    ] = data;
    const replyComments = commentsData.data.children.filter(isCommentType);
    return (
        <Fragment>
            <Banner>
                <div
                    role="button"
                    onClick={() => router.back()}
                    className="flex h-full w-full items-center justify-start pl-[8px] pr-[16px] "
                >
                    <div className="min-w-[56px]">
                        <button
                            type="button"
                            aria-label="Back"
                            tabIndex={0}
                            className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full transition duration-[0.2] hover:bg-[#eff3f4]/10"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                fill="currentColor"
                                className="h-[20px] w-[20px] text-[#eff3f4]"
                            >
                                <g>
                                    <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>

                    <span className="text-17px font-semibold sm:text-20px">
                        Thread
                    </span>
                </div>
            </Banner>

            {/* Head node - start of thread */}
            <HeadPost post={headPostData.data.children[0]} />

            {/* All the reply nodes */}
            <Replies comments={replyComments} />
        </Fragment>
    );
}
