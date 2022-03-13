import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import useRedditQuery from "../hooks/use-reddit-query";
import Post from "./Post";

export function Feed() {
    const router = useRouter();

    const { data, isLoading, isError } = useRedditQuery({
        router,
    });

    return (
        <div className="flex max-w-[600px] flex-col divide-y divide-dim-border border-dim-border">
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {data &&
                data.data.children.map((post: any) => (
                    <Post key={post.data.title} post={post} />
                ))}
        </div>
    );
}
