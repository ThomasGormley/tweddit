import LoadingSpinner from "./LoadingSpinner";
import { formatDistanceToNow , formatDistance } from "date-fns";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Feed } from "./Feed";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

type RedditJson = {};

export function Main({}: any) {
    const { data: session, status } = useSession();

    if (status !== "authenticated") {
        return <div>loading</div>;
    }

    const {
        data: homePageJson,
        isLoading,
        isError,
    } = useQuery({
        queryKey: "home",
        queryFn: async () => fetch("https://oauth.reddit.com/hot/.json", {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session.accessToken}`,
                },
            }).then((res) => res.json()),
    });

    const handleSignIn = () => {
        signIn("reddit");
    };
    const handleSignOut = () => {
        signOut();
    };

    return (
        <main className="z-[1] flex w-full max-w-[600px] flex-col  border border-dim-border font-display">
            <div className="sticky top-0 z-[3] bg-dim px-[16px] backdrop-blur-md">
                <span className="text-20px font-semibold">Home</span>
                <div className="flex justify-end space-x-5">
                    <button onClick={handleSignIn}>Sign In</button>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
            {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
            {isLoading && (
                <div className="flex w-full justify-center py-[12px]">
                    <LoadingSpinner />
                </div>
            )}
            {homePageJson && !isLoading && !isError && (
                <Feed data={homePageJson?.data?.children} />
            )}
        </main>
    );
}
