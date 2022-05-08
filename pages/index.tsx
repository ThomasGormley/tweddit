import type { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Banner from "../components/Banner";
import { Feed } from "../components/Feed";
import BasePage, {
    getServerSideProps as baseGetServerSideProps,
} from "./base.page";

function Index() {
    return (
        <BasePage>
            <main className="flex w-full max-w-[600px] flex-col border-dim-border font-display text-off-white sm:border">
                <Banner />
                <Feed />
            </main>
        </BasePage>
    );
}

export default Index;

export const getServerSideProps = baseGetServerSideProps;
