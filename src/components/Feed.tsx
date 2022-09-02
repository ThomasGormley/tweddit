import useInfiniteRedditQuery from "src/hooks/use-infinite-reddit-query";
import { Link, Listing } from "src/types/reddit-api";
import LoadingSpinner from "./loading-spinner";
import PostSkeleton from "./posts/post-skeleton";
import PostsList from "./posts/posts-list";

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
