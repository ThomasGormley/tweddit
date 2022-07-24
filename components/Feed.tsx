import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import { Listing } from "../types/reddit-api/Listing";
import PostSkeleton from "./posts/PostSkeleton";
import PostsList from "./posts/PostsList";

export function Feed() {
    const router = useRouter();
    const { data, isLoading } = useRedditQuery<Listing>({
        router,
    });

    console.log({ FeedQueryData: data });

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
