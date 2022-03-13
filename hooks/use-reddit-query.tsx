import { useSession } from "next-auth/react";
import Error from "next/error";
import { NextRouter } from "next/router";
import { useQuery } from "react-query";
import { Reddit } from "../types/reddit";

type UseRedditDataProps = {
    router: NextRouter;
};

function useRedditQuery({ router }: UseRedditDataProps) {
    const { data: session } = useSession();
    const { route } = router;

    const sortBy = "hot";
    const r = "";
    const dir = r === "" ? "/" : "/r/askreddit";

    return useQuery<Reddit, Error>({
        queryKey: dir,
        enabled: Boolean(session?.accessToken),
        retry: 3,
        // enabled: status !== "authenticated",
        queryFn: async () =>
            fetch(`https://oauth.reddit.com${route}${sortBy}.json`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session?.accessToken}`,
                },
            }).then((res) => res.json()),
    });
}

export default useRedditQuery;
