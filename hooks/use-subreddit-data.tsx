import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export const subredditDataQueryKey = "subreddit-data";

function useSubredditData(subreddit: string) {
    const { data: session } = useSession();

    return useQuery({
        queryKey: [subredditDataQueryKey, `about-${subreddit}`],
        queryFn: async () =>
            fetch(`https://oauth.reddit.com/r/${subreddit}/about`, {
                method: "GET",
                headers: {
                    Authorization: `bearer ${session?.accessToken}`,
                },
            }).then((res) => res.json()),
    });
}

export default useSubredditData;
