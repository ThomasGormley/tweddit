import Banner from "../components/Banner";
import { Feed } from "../components/Feed";
import RightColumn from "../components/RightColumn";
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
                    <RightColumn />
                </div>
            </main>
        </BasePage>
    );
}

export default Index;

export const getServerSideProps = baseGetServerSideProps;
