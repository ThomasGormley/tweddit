import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Listing } from "src/types/reddit-api";
import { fetchRedditQueryFn } from "src/lib/reddit";
import path from "path";

export const USE_REDDIT_QUERY_KEY = "useRedditQuery";

export function createFetchPath(asPath: string) {
    const params = new URLSearchParams({ html_decode: "1" });
    const pathWithJsonOpt = path.join(asPath, ".json");
    const appPath = `${pathWithJsonOpt}?${params.toString()}`;
    return appPath;
}

export interface UseRedditDataProps<T> {
    queryOptions?: UseQueryOptions<T[], unknown, T[]>;
}

function useRedditQuery<ApiReturnType extends Listing>({
    queryOptions,
}: UseRedditDataProps<ApiReturnType> = {}) {
    const { data: session } = useSession();
    const { asPath } = useRouter();

    const fetchPath = createFetchPath(asPath);

    return useQuery({
        queryKey: [USE_REDDIT_QUERY_KEY, asPath],
        enabled: Boolean(session?.accessToken),
        retry: 3,
        queryFn: () =>
            fetchRedditQueryFn<ApiReturnType>(
                fetchPath,
                session?.accessToken ?? "",
            ),
        ...queryOptions,
    });
}

export default useRedditQuery;
