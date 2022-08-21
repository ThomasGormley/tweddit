import useInfiniteRedditQuery from "@/hooks/use-infinite-reddit-query";
import { Link, Listing } from "@/types/reddit-api";
import LoadingSpinner from "./LoadingSpinner";
import PostSkeleton from "./posts/PostSkeleton";
import PostsList from "./posts/PostsList";

function isIndexLastInArray<T extends unknown[]>(i: number, arr: T): boolean {
    return i + 1 === arr.length;
}

export function Feed() {
    const {
        data: pagesData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteRedditQuery<Listing<Link>>();

    const shouldRenderSkeleton = isLoading || !pagesData;

    return (
        <div className="flex max-w-[600px] flex-col ">
            {shouldRenderSkeleton
                ? Array.from({ length: 10 }).map((_, i) => {
                      return <PostSkeleton key={i} />;
                  })
                : pagesData.pages.map((data, i, arr) => (
                      <PostsList
                          key={`feed-page-${i}`}
                          data={data[0].data.children}
                          fetchNextPage={fetchNextPage}
                          hasNextPage={hasNextPage}
                          isFetchingNextPage={isFetchingNextPage}
                          isBottomOfList={isIndexLastInArray(i, arr)}
                      />
                  ))}
            {isFetchingNextPage && (
                <div className="flex h-48 w-full justify-center pt-[16px]">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}
