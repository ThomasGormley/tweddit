import useInfiniteRedditQuery from "@/hooks/use-infinite-reddit-query";
import { Link } from "../types/reddit-api";
import { Listing } from "../types/reddit-api/Listing";
import PostSkeleton from "./posts/PostSkeleton";
import PostsList from "./posts/PostsList";

export function Feed() {
    const { data, isLoading, fetchNextPage, hasNextPage } =
        useInfiniteRedditQuery<Listing<Link>>();

    const shouldRenderSkeleton = isLoading || !data;
    return (
        <div className="flex max-w-[600px] flex-col ">
            {shouldRenderSkeleton ? (
                Array.from({ length: 10 }).map((_, i) => {
                    return <PostSkeleton key={i} />;
                })
            ) : (
                <>
                    {data.pages.map((data, i) => (
                        <PostsList
                            key={`feed-page-${i}`}
                            data={data[0].data.children}
                        />
                    ))}
                    {hasNextPage && (
                        <button onClick={() => fetchNextPage()}>
                            fetch more
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
