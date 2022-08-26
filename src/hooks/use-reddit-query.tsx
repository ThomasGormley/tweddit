import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Listing } from "src/types/reddit-api";
import { fetchRedditQueryFn } from "src/lib/reddit";
import path from "path";

export interface UseRedditDataProps<T> {
    queryOptions?: UseQueryOptions<T[], unknown, T[]>;
}

function useRedditQuery<ApiReturnType extends Listing>({
    queryOptions,
}: UseRedditDataProps<ApiReturnType> = {}) {
    const { data: session } = useSession();
    const { asPath } = useRouter();

    if (!session) {
        throw new Error("No session");
    }

    const params = new URLSearchParams({ html_decode: "1" });
    const pathWithJsonOpt = path.join(asPath, ".json");
    const appPath = `${pathWithJsonOpt}?${params.toString()}`;

    return useQuery({
        queryKey: ["useRedditQuery", asPath],
        enabled: Boolean(session?.accessToken),
        retry: 3,
        queryFn: () =>
            fetchRedditQueryFn<ApiReturnType>(appPath, session?.accessToken),
        ...queryOptions,
    });
}

export default useRedditQuery;
