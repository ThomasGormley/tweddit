import LoadingSpinner from "./LoadingSpinner";
import React from "react";
import { useQuery } from "react-query";
import { Feed } from "./Feed";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

// type RedditJson = {};

export function Main() {
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
            {/* {<pre>{JSON.stringify(session, null, 2)}</pre>} */}
            <Feed />
        </main>
    );
}
