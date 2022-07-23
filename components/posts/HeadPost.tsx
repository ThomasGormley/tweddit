import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { numberFormatter } from "../../lib/util/numberFormatter";
import { Thread } from "../../types/ThreadsResult";
import MediaThumbnail from "../MediaThumbnail";
import { handleOnClick } from "./Post";
import PostThumbnail from "./PostThumbnail";

type PostProps = {
    post: Thread;
};

export default function HeadPost({ post }: PostProps) {
    const { data: session } = useSession();
    const router = useRouter();

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

    return (
        <article
            className="px-[16px] text-sm "
            onClick={() => handleOnClick(router, post.data.permalink)}
        >
            <div className="flex flex-shrink flex-row items-start py-[12px]">
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
            <div className="mb-4">
                <p className="mb-4 text-23px ">{post.data.title}</p>
                {post.data.preview?.enabled && (
                    <MediaThumbnail preview={post.data.preview} />
                )}
            </div>

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
            <div className="mb-4 space-x-1 border-y border-dim-border py-[16px] text-15px text-dim-grey">
                <div className="space-x-[10px]">
                    <span>
                        <span className="font-bold leading-[20px] text-off-white">
                            {`${numberFormatter(post.data.ups)} `}
                        </span>
                        Upvotes
                    </span>
                    <span>
                        <span className="font-bold leading-[20px] text-off-white">
                            {`${numberFormatter(post.data.num_comments)} `}
                        </span>
                        Replies
                    </span>
                    <span>
                        <span className="font-bold leading-[20px] text-off-white">
                            {`${numberFormatter(post.data.num_crossposts)} `}
                        </span>
                        Crossposts
                    </span>
                </div>
            </div>
        </article>
    );
}
