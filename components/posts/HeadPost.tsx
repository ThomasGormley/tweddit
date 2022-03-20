import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import type { PostProps, PostQuickActions } from "../../types/post";
import { handleOnClick } from "./Post";
import PostThumbnail from "./PostThumbnail";

export default function HeadPost({ post }: PostProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const { query } = router;

    const postedAt = new Date(post.data.created * 1000);

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
                <div className="mr-[12px] flex-shrink-0">
                    {!isLoading && (
                        <PostThumbnail src={subredditData?.data?.icon_img} />
                    )}
                </div>
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
            <div className="mb-4 space-x-1 text-15px text-dim-grey">
                <span>
                    {postedAt.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                </span>
                <span>·</span>
                <span>
                    {postedAt.toLocaleDateString([], {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })}
                </span>
            </div>
        </article>
    );
}
