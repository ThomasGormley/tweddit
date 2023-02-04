import { useRouter } from "next/router";

export default function useCurrentSubreddit() {
    const { asPath } = useRouter();
    return asPath === "/" ? "Home" : asPath;
}
