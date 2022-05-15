import { signIn, signOut } from "next-auth/react";
import Banner from "../components/Banner";
import { Feed } from "../components/Feed";
import MainWrapper from "../components/MainWrapper";
import RightColumn from "../components/RightColumn";
import BasePage, {
    getServerSideProps as baseGetServerSideProps,
} from "./base.page";

function Index() {
    const handleSignIn = () => {
        signIn("reddit");
    };
    const handleSignOut = () => {
        signOut();
    };
    return (
        <BasePage>
            <MainWrapper>
                <div className="flex max-w-[600px] flex-col border-dim-border font-display text-off-white sm:border">
                    <Banner>
                        <div className="px-[16px]">
                            <span className="text-17px font-semibold sm:text-20px">
                                Home
                            </span>
                        </div>
                        <div className="flex justify-end space-x-5 px-[16px]">
                            <button onClick={handleSignIn}>Sign In</button>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </Banner>
                    <Feed />
                </div>
                <RightColumn />
            </MainWrapper>
        </BasePage>
    );
}

export default Index;

export const getServerSideProps = baseGetServerSideProps;
