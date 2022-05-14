import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import { ThreadResult } from "../types/ThreadsResult";
import LoadingSpinner from "./LoadingSpinner";
import PostsList from "./posts/PostsList";

export function Feed() {
    const router = useRouter();

    // const isThread = query.slug?.includes("comments");

    const { data, isLoading } = useRedditQuery<ThreadResult>({
        router,
    });

    if (isLoading || !data) {
        return (
            <div className="flex w-full justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex max-w-[600px] flex-col ">
            
            <PostsList data={data[0].data.children} />
        </div>
    );
}
