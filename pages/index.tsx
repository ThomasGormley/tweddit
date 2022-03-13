import type { GetServerSideProps, NextPage } from "next";
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";
import { Main } from "../components/Main";
import Head from "next/head";
import Image from "next/image";
import { Navigation } from "../components/Navigation";
import { getSession, useSession } from "next-auth/react";
import { json } from "stream/consumers";

const Index: NextPage = () => {
    return (
        <div className="mx-auto flex h-full min-h-screen  bg-dim text-white">
            <Navigation />
            <Main />
        </div>
    );
};

export default Index;

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    return { props: { session } };
}
