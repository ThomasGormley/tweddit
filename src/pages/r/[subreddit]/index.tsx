import Index from "../../index";
import {
    getServerSideProps as baseGetServerSideProps,
} from "../../base.page";

function Subreddit() {
    return <Index />;
}

export default Subreddit;

export const getServerSideProps = baseGetServerSideProps;
