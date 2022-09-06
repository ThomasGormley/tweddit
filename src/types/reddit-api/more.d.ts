/**
 * More interface kind: `more`
 */
export interface More {
    kind: "more";
    data: MoreData;
}

export interface MoreData {
    count: number;
    name: string;
    id: string;
    parent_id: string;
    depth: number;
    children: string[];
}
