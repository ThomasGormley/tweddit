import { useSession } from "next-auth/react";
import Error from "next/error";
import { NextRouter } from "next/router";
import { useQuery } from "react-query";
import { CommentsResult } from "../types/CommentsResult";
import { ThreadResult } from "../types/ThreadsResult";

type UseRedditDataProps = {
    router: NextRouter;
};

function useRedditQuery<ApiReturnType = ThreadResult>({
    router,
}: UseRedditDataProps) {
    const { data: session } = useSession();
    let { asPath, query } = router;

    const isThread = query.slug?.includes("comments");

    if (isThread && asPath.charAt(asPath.length) != "/") {
        asPath = asPath + "/";
    }

    const buildPath = isThread ? asPath : `${asPath}/.json?html_decode=1`;

    console.log("buildPath", buildPath);

    return useQuery<Array<ApiReturnType>, Error>({
        queryKey: asPath,
        enabled: Boolean(session?.accessToken),
        retry: 3,
        queryFn: async () => {
            const res = await fetch(`https://oauth.reddit.com${buildPath}`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session?.accessToken}`,
                },
            });

            const json = await res.json();

            console.log("json", json);
            if (json instanceof Array) {
                return json;
            }

            return [json];
        },
    });
}

export default useRedditQuery;
