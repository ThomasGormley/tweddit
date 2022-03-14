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

    const buildPath = isThread ? asPath : `${asPath}/${sortBy}/.json?html_decode=1`;

    return useQuery<RedditResponse | Array<RedditResponse>, Error>({
        queryKey: asPath,
        enabled: Boolean(session?.accessToken),
        retry: 3,
        // enabled: status !== "authenticated",
        queryFn: async () =>
            fetch(`https://oauth.reddit.com${buildPath}`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session?.accessToken}`,
                },
            }).then((res) => res.json()),
    });
}

export default useRedditQuery;
