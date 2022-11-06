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

function Index() {
    const { asPath } = useRouter();
    const currentSubreddit = asPath === "/" ? "Home" : asPath;
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
                    <div className="hidden w-full flex-row py-[4px] px-[16px] sm:flex">
                        <div className="mr-[12px] pt-[4px] h-[48px] w-[48px]">
                            <UserAvatar />
                        </div>

                        <div className="w-full py-[12px]">
                            <textarea
                                name="compose"
                                placeholder="What's happening?"
                                rows={1}
                                wrap="hard"
                                className="w-full resize-none overflow-auto overflow-y-hidden border-none bg-transparent py-[2px] text-20px leading-[24px] outline-none"
                                id="compose"
                            ></textarea>
                            {/* TODO: should only show when textarea in focus - which subreddit to post self.text to */}
                            <div className="ml-[-8px] border-b border-dim-border ">
                                <div className="pb-[12px]">
                                    <button className="min-h-[24px] min-w-[24px] rounded-full px-[12px] font-bold transition duration-[0.2] hover:bg-primary/10">
                                        <span className="break-words text-14px leading-[16px] text-primary">
                                            {currentSubreddit}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Feed />
                </div>
            </MainWrapper>
        </BasePage>
    );
}

export default Index;

export const getServerSideProps = baseGetServerSideProps;
