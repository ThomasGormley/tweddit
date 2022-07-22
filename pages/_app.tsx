import "../styles/globals.css";
import "../public/fonts/fonts.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Fragment } from "react";
import Head from "next/head";
import { useScrollRestoration } from "../hooks/use-scroll-restoration";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            // suspense: true,
        },
    },
});

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
    router,
}: AppProps) {
    useScrollRestoration(router);
    return (
        <Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
                />
                <meta
                    name="description"
                    content="Tweddit — a Twitter skin for Reddit"
                />
                <meta name="keywords" content="Keywords" />
                <title>Home / Tweddit</title>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </QueryClientProvider>
        </Fragment>
    );
}

export default MyApp;
