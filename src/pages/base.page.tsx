import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, signIn, useSession } from "next-auth/react";
import React, { PropsWithChildren, useEffect } from "react";
import MobileNavigation from "../components/mobile-navigation";
import { Navigation } from "../components/navigation";

type BasePageProps = PropsWithChildren<{
    component?: string;
}>;

export default function BasePage({ children }: BasePageProps) {
    const { status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("anon", { redirect: false });
        }
    }, [status]);

    return (
        <div className=" flex h-full min-h-screen  bg-dim text-white">
            <Navigation />
            <MobileNavigation />
            {children}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{
    session: Session | null;
}> = async (context) => {
    const session = await getSession(context);
    return {
        props: {
            session,
        },
    };
};
