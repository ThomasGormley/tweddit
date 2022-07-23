import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import { ThreadResult } from "../types/ThreadsResult";
import PostSkeleton from "./posts/PostSkeleton";
import PostsList from "./posts/PostsList";

export function Feed() {
    const router = useRouter();
    const { data, isLoading } = useRedditQuery<ThreadResult>({
        router,
    });

    const shouldRenderSkeleton = isLoading || !data;
    return (
        <div className="flex max-w-[600px] flex-col ">
            {shouldRenderSkeleton ? (
                Array.from({ length: 10 }).map((_, i) => {
                    return <PostSkeleton key={i} />;
                })
            ) : (
                <PostsList data={data[0].data.children} />
            )}
        </div>
    );
}
