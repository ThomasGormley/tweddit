import config from "@/lib/config";
import { Listing } from "@/types/reddit-api";
import { Subreddit } from "@/types/reddit-api/subreddit";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

async function getSubredditsSearch(search: string, session: Session | null) {
    const url = new URL(`${config.urls.reddit.oauth}/subreddits/search.json`);
    url.searchParams.append("q", search);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `bearer ${session?.accessToken}`,
        },
    });

    return (await response.json()) as Listing<Subreddit>;
}

function useSubredditsSearch(search: string) {
    const { data: session } = useSession();

    return useQuery({
        queryKey: [search],
        queryFn: async () => getSubredditsSearch(search, session),
        enabled: search.length > 2,
    });
}

export default useSubredditsSearch;
