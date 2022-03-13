import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextPage,
} from "next";
import { Main } from "../components/Main";
import { Navigation } from "../components/Navigation";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { Feed } from "../components/Feed";
import { useEffect } from "react";

const Index: NextPage = () => {
    const { status, data: session } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("anon", { redirect: false }).then((response) => {
                if (response.ok) {
                    // anonymous login complete
                    //  - status will be 'authenticated'
                    //  - data.isLoggedIn will be true
                } else {
                    // anonymous login failed, check response.error and display an error
                }
            });
        }
    }, [status]);

    return (
        <div className="mx-auto flex h-full min-h-screen  bg-dim text-white">
            <Navigation />
            <pre className="absolute top-0 bg-black z-10">{JSON.stringify(session, null, 2)}</pre>
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
