import Banner from "../components/Banner";
import { Feed } from "../components/Feed";
import BasePage, {
    getServerSideProps as baseGetServerSideProps,
} from "./base.page";

function Index() {
    return (
        <BasePage>
            <main className="flex flex-shrink flex-grow flex-row items-start">
                <div className="flex justify-between sm:w-[600px] md:w-[920px] lg:w-[990px]">
                    <div className="flex max-w-[600px] flex-col border-dim-border font-display text-off-white sm:border">
                        <Banner />
                        <Feed />
                    </div>

                    {/* Search column */}
                    <div className="mr-[10px] hidden md:flex md:w-[290px] pt-[6px] lg:w-[350px]">
                        <div className="fixed flex w-[inherit] flex-col">
                            <div className="">
                                <form
                                    aria-label="Search Tweddit"
                                    role="search"
                                    className="w-full rounded-full  bg-[#273340] text-off-white flex justify-center items-center"
                                >
                                    <div className="ml-[8px]">
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            className="w-6 h-6 min-w-[32px] text-[#8b98a5] pl-[12px]"
                                        >
                                            <g>
                                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        placeholder="Search Tweddit"
                                        className="w-full bg-transparent p-[12px] ml-[2px] text-15px "
                                    ></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </BasePage>
    );
}

export default Index;

export const getServerSideProps = baseGetServerSideProps;
