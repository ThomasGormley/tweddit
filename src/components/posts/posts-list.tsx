import React, { Fragment, useRef } from "react";
import { Link } from "src/types/reddit-api/Link";
import Post from "./post";
import useIntersectionObserver from "src/hooks/use-intersection-observer";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";
import { Listing } from "src/types/reddit-api";

type PostsProps = {
    data: Array<Link>;
    fetchNextPage: () => Promise<
        InfiniteQueryObserverResult<Listing<Link>[], unknown>
    >;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    isBottomOfList: boolean;
};

export default function PostsList({
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isBottomOfList,
}: PostsProps) {
    const postRef = useRef(null);
    // https://github.com/TanStack/query/issues/520#issuecomment-1068002094
    const observer = useIntersectionObserver(postRef);
    const isVisible = !!observer?.isIntersecting;

    if (isVisible && hasNextPage && !isFetchingNextPage && isBottomOfList) {
        fetchNextPage();
    }

    return (
        <Fragment>
            {data.map((post) => (
                <Post ref={postRef} key={post.data.id} post={post} />
            ))}
        </Fragment>
    );
}
