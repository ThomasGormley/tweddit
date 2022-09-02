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
                    <Banner>
                        <div className="px-[16px]">
                            <span className="text-17px font-semibold sm:text-20px">
                                Home
                            </span>
                        </div>
                        <div className="flex items-center justify-end space-x-5 px-[16px]">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                fill="currentColor"
                                className="h-[19px] w-[19px] text-[#eff3f4]"
                            >
                                <g>
                                    <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                                </g>
                            </svg>
                        </div>
                    </Banner>
                    <div className="hidden w-full flex-row py-[4px] px-[16px] sm:flex">
                        <div className="mr-[12px] h-[48px] w-[48px] flex-shrink-0 basis-[48px] rounded-full bg-black pt-[4px]" />

                        <div className="w-full py-[12px]">
                            <textarea
                                name="compose"
                                placeholder="What's happening?"
                                rows={1}
                                wrap="hard"
                                className="w-full resize-none overflow-auto overflow-y-hidden border-none bg-transparent py-[2px] text-20px leading-[24px] outline-none"
                                id="compose"
                            ></textarea>

                            <div className="ml-[-8px] border-b border-dim-border ">
                                <div className="pb-[12px]">
                                    <button className="min-h-[24px] min-w-[24px] rounded-full px-[12px] font-bold transition duration-[0.2] hover:bg-primary/10">
                                        <span className="break-words text-14px leading-[16px] text-primary">
                                            {asPath === "/"
                                                ? "/r/Home"
                                                : asPath}
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
