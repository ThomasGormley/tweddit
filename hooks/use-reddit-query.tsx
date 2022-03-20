import { useSession } from "next-auth/react";
import Error from "next/error";
import { NextRouter } from "next/router";
import { useQuery } from "react-query";
import { RedditResponse } from "../types/reddit";

type UseRedditDataProps = {
    router: NextRouter;
};

function useRedditQuery({ router }: UseRedditDataProps) {
    const { data: session } = useSession();
    const { route, asPath, query } = router;

    const isThread = query.slug?.includes("comments");

    const sortBy = "hot";
    console.log(asPath);
    const buildPath = isThread
        ? asPath
        : `${asPath}${sortBy}/.json?html_decode=1`;

    console.log("buildPath", buildPath);

    return useQuery<Array<RedditResponse>, Error>({
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

            if (json instanceof Array) {
                return json;
            }
            return [json];
        },
    });
}

export default useRedditQuery;
