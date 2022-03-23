import { signIn, signOut } from "next-auth/react";
import React from "react";
export default function Banner() {
    const handleSignIn = () => {
        signIn("reddit");
    };
    const handleSignOut = () => {
        signOut();
    };
    return (
        <header
            role="banner"
            className="sticky -top-[1px] z-10 flex h-[53px] items-center justify-between bg-dim/75 px-[16px] backdrop-blur-md"
        >
            <div>
                <span className="text-17px font-semibold sm:text-20px">
                    Home
                </span>
            </div>
            <div className="flex justify-end space-x-5">
                <button onClick={handleSignIn}>Sign In</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </header>
    );
}
