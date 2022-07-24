import { Comment } from "./Comment";
import { Link } from "./Link";
import { More } from "./More";

export type KindTypePrefixes = Comment | More | Link;
/**
 * Listing is general term for result that can contain any kind `t1, t3, more`
 */
export interface Listing {
    kind: "Listing";
    data: ListingData;
}

export interface ListingData {
    modhash: string;
    dist: number;
    children: KindTypePrefixes[];
    after: string;
    before: null;
}
