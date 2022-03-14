import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import { Children } from "../types/reddit";
import LoadingSpinner from "./LoadingSpinner";
import Post from "./posts/Post";
import PostsList from "./posts/PostsList";
import Thread from "./Thread";

export function Feed() {
    const router = useRouter();
    const { query } = router;

    const isThread = query.slug?.includes("comments");

    const { data, isLoading } = useRedditQuery({
        router,
    });

    if (isLoading || !data) {
        return (
            <div className="flex w-full justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    console.log("data", data);

    return (
        <div className="flex max-w-[600px] flex-col divide-y divide-dim-border border-dim-border">
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {isThread ? (
                <Thread data={data} />
            ) : (
                <PostsList data={data.data.children} />
            )}
        </div>
    );
}
