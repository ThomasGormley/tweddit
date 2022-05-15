import "../styles/globals.css";
import "../public/fonts/fonts.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Fragment } from "react";
import Head from "next/head";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            // suspense: true,
        },
    },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <Fragment>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
                />
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
