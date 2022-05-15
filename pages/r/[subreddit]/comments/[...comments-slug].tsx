import React from "react";
import BasePage from "../../../base.page";
import { getServerSideProps as baseGetServerSideProps } from "../../../base.page";
import ThreadView from "../../../../components/ThreadView";
import RightColumn from "../../../../components/RightColumn";
import MainWrapper from "../../../../components/MainWrapper";

function CommentsSlug() {
    return (
        <BasePage>
            <MainWrapper>
                <div className="flex max-w-[600px] flex-col border-dim-border font-display text-off-white sm:border">
                    <ThreadView />
                </div>
                <RightColumn />
            </MainWrapper>
        </BasePage>
    );
}

export default CommentsSlug;

export const getServerSideProps = baseGetServerSideProps;
