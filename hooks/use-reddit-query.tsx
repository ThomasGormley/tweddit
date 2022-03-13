import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Error from "next/error";
import { NextRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

type UseRedditDataProps = {
    router: NextRouter;
};

function useRedditQuery({ router }: UseRedditDataProps) {
    const { data: session, status } = useSession();

    const sortBy = "hot";
    const r = "";
    const dir = r === "" ? "/" : "/r/askreddit";

    return useQuery<any, Error>({
        queryKey: dir,
        enabled: Boolean(session?.accessToken),
        retry: 3,
        // enabled: status !== "authenticated",
        queryFn: async () =>
            fetch(`https://oauth.reddit.com${dir}/${sortBy}.json`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session?.accessToken}`,
                },
            }).then((res) => res.json()),
    });
}

export default useRedditQuery;
