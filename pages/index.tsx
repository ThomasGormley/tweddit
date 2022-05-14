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
                    <div className="mr-[10px] hidden md:flex md:w-[290px] lg:w-[350px]">
                        <div className="flex flex-col w-full">
                            <div>
                                <form aria-label="Search Tweddit" role="search" className="w-full">
                                    <input type="search" placeholder="Search Tweddit" className="w-full bg-[#273340] text-off-white rounded-2xl p-[12px] font-normal"></input>
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
