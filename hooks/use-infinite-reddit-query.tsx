import { useSession } from "next-auth/react";
import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Listing } from "@/types/reddit-api";
import { fetchRedditQueryFn } from "@/lib/reddit";
import path from "path";

interface UseInfiniteRedditDataProps<T> {
    queryOptions?: UseInfiniteQueryOptions<T[], unknown, T[]>;
}

function useInfiniteRedditQuery<ApiReturnType extends Listing>({
    queryOptions,
}: UseInfiniteRedditDataProps<ApiReturnType> = {}) {
    const { data: session } = useSession();
    const { asPath } = useRouter();

    if (!session) {
        throw new Error("No session");
    }

    const params = new URLSearchParams({ html_decode: "1" });
    const pathWithJsonOpt = path.join(asPath, ".json");
    const appPath = `${pathWithJsonOpt}?${params.toString()}`;

    return useInfiniteQuery({
        queryKey: ["useInfiniteRedditQuery", asPath],
        retry: 3,
        enabled: Boolean(session.accessToken),
        queryFn: (ctx) =>
            fetchRedditQueryFn<ApiReturnType>(
                appPath,
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
