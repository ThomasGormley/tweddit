import "../styles/globals.css";
import "../public/fonts/fonts.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { PublicTokenProvider } from "../context/public-token-context";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function MyApp({
    Component,
    pageProps: { session, publicToken, ...pageProps },
}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                {/* <PublicTokenProvider token={publicToken}> */}
                <Component {...pageProps} />
                {/* </PublicTokenProvider> */}
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
