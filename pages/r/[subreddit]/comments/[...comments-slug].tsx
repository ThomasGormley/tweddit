import React from "react";
import BasePage from "../../../base.page";
import { Feed } from "../../../../components/Feed";
import { getServerSideProps as baseGetServerSideProps } from "../../../base.page";
import { useRouter } from "next/router";
import useRedditQuery from "../../../../hooks/use-reddit-query";
import { ThreadResult } from "../../../../types/ThreadsResult";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ThreadDisplay from "../../../../components/Thread";

function CommentsSlug() {
    return (
        <BasePage>
            <ThreadDisplay />
            {/* <Feed /> */}
        </BasePage>
    );
}

export default CommentsSlug;

// const Subreddit: NextPage = () => {
//     const { status, data: session } = useSession();

//     useEffect(() => {
//         if (status === "unauthenticated") {
//             signIn("anon", { redirect: false });
//         }
//     }, [status]);

//     return (
//         <div className="mx-auto flex h-full min-h-screen  bg-dim text-white">
//             <Navigation />
//             {/* <pre className="absolute top-0 bg-black z-10">{JSON.stringify(session, null, 2)}</pre> */}
//             <Main />
//         </div>
//     );
// };

// export default Subreddit;

export const getServerSideProps = baseGetServerSideProps;
