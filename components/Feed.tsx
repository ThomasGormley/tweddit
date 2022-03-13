import { useRouter } from "next/router";
import useRedditQuery from "../hooks/use-reddit-query";
import { PostType } from "../types/reddit";
import LoadingSpinner from "./LoadingSpinner";
import Post from "./Post";

export function Feed() {
    const router = useRouter();

    const { data, isLoading } = useRedditQuery({
        router,
    });

    if (isLoading) {
        return (
            <div className="flex w-full justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex max-w-[600px] flex-col divide-y divide-dim-border border-dim-border">
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

            {!isLoading &&
                data &&
                data?.data?.children.map((post: PostType) => (
                    <Post key={post.data.title} post={post} />
                ))}
        </div>
    );
}
