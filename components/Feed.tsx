import Post from './Post';

type FeedData = any;

export function Feed({ data }: FeedData) {
    return (
        <div className="flex max-w-[600px] flex-col divide-y divide-dim-border border-dim-border">
            {data &&
                data.map((post: any) => <Post key={post.data.title} post={post} />)}
        </div>
    );
}
