import { Link } from "../types/reddit-api/Link";
import type { KindTypePrefixes, Listing } from "../types/reddit-api/Listing";
import { More } from "../types/reddit-api/More";

export const isLinkType = (arg: KindTypePrefixes): arg is Link => {
    return arg.kind === "t3";
};

export const isMoreType = (arg: KindTypePrefixes): arg is More => {
    return arg.kind === "more";
};

export const isListingType = (
    arg: KindTypePrefixes | Listing,
): arg is Listing => {
    return arg.kind === "Listing";
};
