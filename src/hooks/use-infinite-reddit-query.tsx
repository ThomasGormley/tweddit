import { useSession } from "next-auth/react";
import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Listing } from "src/types/reddit-api";
import { fetchRedditQueryFn } from "src/lib/reddit";
import path from "path";
import { createFetchPath } from "./use-reddit-query";

interface UseInfiniteRedditDataProps<T> {
    queryOptions?: UseInfiniteQueryOptions<T[], unknown, T[]>;
}

function useInfiniteRedditQuery<ApiReturnType extends Listing>({
    queryOptions,
}: UseInfiniteRedditDataProps<ApiReturnType> = {}) {
    const { data: session } = useSession();
    const { asPath } = useRouter();

    if (!session) {
        return;
    }

    const fetchPath = createFetchPath(asPath);

    return useInfiniteQuery({
        queryKey: ["useInfiniteRedditQuery", asPath],
        retry: 3,
        enabled: Boolean(session?.accessToken),
        queryFn: (ctx) =>
            fetchRedditQueryFn<ApiReturnType>(
                fetchPath,
                session?.accessToken,
                ctx?.pageParam ?? undefined,
            ),
        getNextPageParam: (lastPage) => {
            return lastPage[0].data.after ?? undefined;
        },
        ...queryOptions,
    });
}

export default useInfiniteRedditQuery;
