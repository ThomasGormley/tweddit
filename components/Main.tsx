import Banner from "./Banner";
import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import { useQuery } from "react-query";
import { Feed } from "./Feed";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

// type RedditJson = {};

export function Main() {
    return (
        <main className="flex w-full max-w-[600px] flex-col border-dim-border font-display text-off-white sm:border">
            <Banner />
            {/* {<pre>{JSON.stringify(session, null, 2)}</pre>} */}
            <Feed />
        </main>
    );
}
