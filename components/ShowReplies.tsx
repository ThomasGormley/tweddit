import React from "react";

export function ShowReplies({}) {
    return (
        <button type="button" className="flex flex-row py-[8px] pl-[16px]">
            <div className="mr-[12px] flex h-[16px] basis-[48px] flex-col items-center justify-between self-center">
                <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
                <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
                <div className="h-[2px] w-[2px] bg-dim-reply-link"></div>
            </div>
            <div className="">
                <span className="text-15px text-[#1D9BF0]">Show replies</span>
            </div>
        </button>
    );
}
