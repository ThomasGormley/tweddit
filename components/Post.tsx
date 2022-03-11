import PostThumbnail from './PostThumbnail';
import React from 'react';
import QuickActions from './QuickActions';
import { useQuery } from 'react-query';
import formatTimeDistanceToNowShortSuffix from '../lib/util/formatTimeToNowShortSuffix';

type TQuickActions = { type: string; data?: number }[];
const token = '-h3oSbFfls22mO_UkawmuLphG9sD47Q';

export default function Post({ post }: any) {
    const { data: subredditData } = useQuery({
        queryKey: `about-${post.data.subreddit}`,
        queryFn: async () => {
            return fetch(
                `https://oauth.reddit.com/r/${post.data.subreddit}/about`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                },
            ).then((res) => res.json());
        },
    });

    const quickActions: TQuickActions = [
        {
            type: 'comments',
            data: post.data.num_comments,
        },
        {
            type: 'crossposts',
            data: post.data.num_crossposts,
        },
        {
            type: 'upvotes',
            data: post.data.ups,
        },
        {
            type: 'share',
        },
    ];

    const postedAt = new Date(post.data.created * 1000);
    const postedAgo = formatTimeDistanceToNowShortSuffix(postedAt);

    return (
        <article className="px-[16px] text-sm">
            <div className="flex flex-row items-start py-[12px]">
                <PostThumbnail src={subredditData?.data?.icon_img} />
                <div className="w-full">
                    <div className="flex items-center space-x-[4px]">
                        <div>
                            <a href="" className="text-15px font-bold ">
                                {post.data.author}
                            </a>
                        </div>
                        <div>
                            <span className="text-dim-grey">
                                {post.data.subreddit_name_prefixed}
                            </span>
                        </div>
                        <span className="text-15px text-dim-grey">·</span>
                        <time
                            dateTime={postedAt.toISOString()}
                            className="text-15px font-normal text-dim-grey"
                        >
                            {postedAgo}
                        </time>
                    </div>
                    <p>{post.data.title}</p>

                    <QuickActions actions={quickActions} />
                </div>
            </div>
        </article>
    );
}
