import React from "react";
import BasePage, { getServerSideProps as baseGetServerSideProps } from "src/pages/base.page";
import ThreadView from "@/components/thread-view";
import MainWrapper from "@/components/main-wrapper";

function CommentsSlug() {
    return (
        <BasePage>
            <MainWrapper>
                <div className="flex flex-shrink break-words max-w-[600px] flex-col border-dim-border font-display text-off-white sm:border">
                    <ThreadView />
                </div>
            </MainWrapper>
        </BasePage>
    );
}

export default CommentsSlug;

export const getServerSideProps = baseGetServerSideProps;
