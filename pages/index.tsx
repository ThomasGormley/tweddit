import type { GetServerSidePropsContext, NextPage } from "next";

import { Main } from "../components/Main";

import { Navigation } from "../components/Navigation";

import { getSession } from "next-auth/react";

const Index: NextPage = () => (
    <div className="mx-auto flex h-full min-h-screen  bg-dim text-white">
        <Navigation />

        <Main />
    </div>
);

export default Index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    return { props: { session } };
}
