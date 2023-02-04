interface PostToSubredditProps {
    postToSubreddit: string;
}

function PostToSubreddit({ postToSubreddit }: PostToSubredditProps) {
    return (
        <div className="ml-[-8px] border-b border-dim-border transition duration-150">
            <div className="pb-[12px]">
                <button className="min-h-[24px] min-w-[24px] rounded-full px-[12px] font-bold transition duration-[0.2] hover:bg-primary/10">
                    <span className="break-words text-14px leading-[16px] text-primary">
                        {postToSubreddit}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default PostToSubreddit;
