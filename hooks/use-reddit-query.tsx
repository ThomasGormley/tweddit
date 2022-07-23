import { useSession } from "next-auth/react";
import Error from "next/error";
import { NextRouter } from "next/router";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { ThreadResult } from "../types/ThreadsResult";

interface UseRedditDataProps<T> {
    router: NextRouter;
    queryOptions?: UseQueryOptions<
        T[],
        Error<Record<string, unknown>>,
        T[],
        QueryKey
    >;
}

function useRedditQuery<ApiReturnType = ThreadResult>({
    router,
    queryOptions,
}: UseRedditDataProps<ApiReturnType>) {
    const { data: session } = useSession();
    let { asPath, query } = router;

    const isThread = query.slug?.includes("comments");

    if (isThread && asPath.charAt(asPath.length) != "/") {
        asPath = asPath + "/";
    }

    const buildPath = isThread ? asPath : `${asPath}/.json?html_decode=1`;

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

            if (json instanceof Array) {
                return json;
            }

            return [json];
        },
        ...queryOptions,
    });
}

export default useRedditQuery;
