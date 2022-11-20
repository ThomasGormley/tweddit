import UserAvatar from "../components/user-avatar";
import { CurrentSubredditBanner } from "../components/current-subreddit-banner";
// import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Banner from "../components/banner";
import { Feed } from "../components/feed";
import MainWrapper from "../components/main-wrapper";
import BasePage, {
    getServerSideProps as baseGetServerSideProps,
} from "./base.page";
import { WhatsHappening } from "src/features/whats-happening/whats-happening";
import { WhatsHappeningProvider } from "src/features/whats-happening/hooks/whats-happening-context";

function Index() {
    // const handleSignIn = () => {
    //     signIn("reddit");
    // };
    // const handleSignOut = () => {
    //     signOut();
    // };
    return (
        <BasePage>
            <MainWrapper>
                <div className="flex w-full max-w-[600px] flex-col border-dim-border font-display text-off-white sm:border">
                    <CurrentSubredditBanner />
                    <div className="hidden w-full flex-row border-b border-dim-border py-[4px] px-[16px] sm:flex">
                        <div className="mr-[12px] h-[48px] w-[48px] pt-[4px]">
                            <UserAvatar />
                        </div>
                        <WhatsHappeningProvider>
                            <WhatsHappening />
                        </WhatsHappeningProvider>
                    </div>
                    <Feed />
                </div>
            </MainWrapper>
        </BasePage>
    );
}

export default Index;

export const getServerSideProps = baseGetServerSideProps;
