import { Comment, Link, More } from ".";
import { Subreddit } from "./subreddit";

export type KindTypePrefixes = Comment | More | Link | Subreddit;
/**
 * Listing is general term for result that can contain any kind `t1, t3, more`
 */
export interface Listing<T = KindTypePrefixes> {
    kind: "Listing";
    data: ListingData<T>;
}

export interface ListingData<T = KindTypePrefixes> {
    modhash: string;
    dist: number;
    children: T[];
    after: string;
    before: null;
}
