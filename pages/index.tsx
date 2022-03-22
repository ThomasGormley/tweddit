import type { GetServerSideProps, NextPage } from "next";
import { Main } from "../components/Main";
import { Navigation } from "../components/Navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Session } from "next-auth";
import MobileNavigation from "../components/MobileNavigation";

const Index: NextPage = () => {
    const { status, data: session } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("anon", { redirect: false });
        }
    }, [status]);

    return (
        <div className="mx-auto flex h-full min-h-screen flex-row  bg-dim text-white">
            <Navigation />
            <MobileNavigation />
            {/* <pre className="absolute top-0 bg-black z-10">{JSON.stringify(session, null, 2)}</pre> */}
            <Main />
        </div>
    );
};

export default Index;

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
