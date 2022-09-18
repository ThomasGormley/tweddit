import { USE_INFINITE_REDDIT_QUERY_KEY } from "@/hooks/use-infinite-reddit-query";
import { USE_REDDIT_QUERY_KEY } from "@/hooks/use-reddit-query";
import { checkIsMobile } from "@/lib/util/device-check";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Fragment, useCallback } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import LoadingSpinner from "./loading-spinner";
import RightColumn from "./right-column";

interface MainWrapperProps {
    children: React.ReactNode;
}
const pullingContentJsx = (
    <div className="flex w-full justify-center py-[12px]">
        <svg
            viewBox="0 0 30 72"
            aria-label="Pull to refresh"
            role="img"
            fill="currentColor"
            className="h-[32px] text-[#5c6e7e]"
        >
            <g>
                <path d="M28.414 38.586c-.78-.78-2.046-.78-2.828 0L17 47.172V22c0-1.106-.894-2-2-2s-2 .894-2 2v25.172l-8.586-8.586c-.78-.78-2.046-.78-2.828 0s-.78 2.046 0 2.828l12 12c.39.39.9.586 1.414.586s1.024-.196 1.414-.586l12-12c.78-.78.78-2.046 0-2.828z"></path>
            </g>
        </svg>
    </div>
);
const refreshingContentJsx = (
    <div className="flex w-full justify-center py-[24px]">
        <LoadingSpinner />
    </div>
);

export default function MainWrapper({ children }: MainWrapperProps) {
    const queryClient = useQueryClient();
    const isMobile = checkIsMobile();
    const { asPath } = useRouter();

    const refresh = useCallback(() => {
        return Promise.all(
            [USE_INFINITE_REDDIT_QUERY_KEY, USE_REDDIT_QUERY_KEY].map((key) =>
                queryClient.invalidateQueries({
                    queryKey: [key, asPath],
                }),
            ),
        );
    }, []);

    return (
        <main className="flex min-w-0 flex-shrink flex-grow flex-row items-start justify-center text-14px sm:justify-start sm:text-15px">
            <div className="flex min-h-screen h-full w-full justify-between md:w-[920px] lg:w-[990px]">
                <PullToRefresh
                    isPullable={!!isMobile}
                    maxPullDownDistance={999}
                    pullDownThreshold={70}
                    resistance={3}
                    onRefresh={refresh}
                    pullingContent={pullingContentJsx}
                    refreshingContent={refreshingContentJsx}
                >
                    <Fragment>{children}</Fragment>
                </PullToRefresh>
                <RightColumn />
            </div>
        </main>
    );
}
