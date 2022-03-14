import { NextPage, GetServerSideProps } from "next";
import { Session } from "next-auth";
import { useSession, signIn, getSession } from "next-auth/react";
import { useEffect } from "react";
import { Main } from "../../components/Main";
import { Navigation } from "../../components/Navigation";

const Subreddit: NextPage = () => {
    const { status, data: session } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("anon", { redirect: false });
        }
    }, [status]);

    return (
        <div className="mx-auto flex h-full min-h-screen  bg-dim text-white">
            <Navigation />
            {/* <pre className="absolute top-0 bg-black z-10">{JSON.stringify(session, null, 2)}</pre> */}
            <Main />
        </div>
    );
};

export default Subreddit;

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
