import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { handleOnClick } from "./Post";
import PostThumbnail from "./PostThumbnail";
import { PostProps, PostQuickActions } from "./post";

export default function HeadPost({ post }: PostProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const { query } = router;

    const { data: subredditData, isLoading } = useQuery({
        queryKey: `about-${post.data.subreddit}`,
        queryFn: async () =>
            fetch(`https://oauth.reddit.com/r/${post.data.subreddit}/about`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session?.accessToken}`,
                },
            }).then((res) => res.json()),
    });

    const quickActions: PostQuickActions = [
        {
            type: "comments",
            data: post.data.num_comments,
        },
        {
            type: "crossposts",
            data: post.data.num_crossposts,
        },
        {
            type: "upvotes",
            data: post.data.ups,
        },
        {
            type: "share",
        },
    ];

    return (
        <article
            className="px-[16px] text-sm"
            onClick={() => handleOnClick(router, post.data.permalink)}
        >
            <div className="flex flex-row items-start py-[12px]">
                {!isLoading && (
                    <PostThumbnail src={subredditData?.data?.icon_img} />
                )}
                <div className="w-full">
                    <div className="mb-[10px] flex flex-col items-start">
                        <div>
                            <a href="" className="text-15px font-bold ">
                                {post.data.author}
                            </a>
                        </div>
                        <div>
                            <span className="text-dim-grey">
                                {`u/${post.data.author.toLowerCase()}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mb-4 text-23px">{post.data.title}</p>
        </article>
    );
}
