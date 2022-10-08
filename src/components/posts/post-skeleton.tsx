import React from "react";

export const DATA_TEST_ID = "post-loading-skeleton";

function PostSkeleton() {
    return (
        <article
            data-testid={DATA_TEST_ID}
            className="border-b border-dim-border px-[16px]"
        >
            <div className="relative flex h-full animate-pulse flex-row items-start py-[12px]">
                <div className="mr-[12px] flex h-full flex-shrink-0 flex-col items-center space-y-[4px]">
                    <div className="h-[48px] w-[48px]  rounded-full bg-dim-border/75" />
                </div>
                <div className="w-full">
                    <div className="flex flex-col">
                        <PostSkeleton.Bone width="50%" />

                        <div className="w-full space-y-[4px] py-[16px]">
                            <PostSkeleton.Bone />
                            <PostSkeleton.Bone />
                            <PostSkeleton.Bone width="30%" />
                        </div>

                        <PostSkeleton.Bone height="128px" borderRadius="8px" />

                        <div className="flex items-center justify-center space-x-[12px] px-[16px] py-[12px]">
                            <PostSkeleton.Bone width="20%" />
                            <PostSkeleton.Bone width="20%" />
                            <PostSkeleton.Bone width="20%" />
                            <PostSkeleton.Bone width="20%" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

PostSkeleton.Bone = ({
    width = "100%",
    height = "12px",
    borderRadius = "999px",
}: {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
}) => {
    return (
        <div
            style={{ width, height, borderRadius }}
            className=" bg-dim-border/75"
        />
    );
};

export default PostSkeleton;
