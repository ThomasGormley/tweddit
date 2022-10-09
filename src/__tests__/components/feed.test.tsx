import { DATA_TEST_ID as SKELETON_DATA_TEST_ID } from "@/components/posts/post-skeleton";
import { screen } from "@testing-library/react";
import { Feed } from "src/components/feed";
import mockRouter from "next-router-mock";
import homeJson from "mocks/data/reddit-home.json";
import {
    renderWithProviders,
} from "../__helpers__/render-utils";
jest.mock("next/router", () => require("next-router-mock"));

describe("<Feed />", () => {
    mockRouter.setCurrentUrl("/");

    it("displays loading skeleton when fetching", async () => {
        renderWithProviders(<Feed />);

        const skeletonElements = screen.getAllByTestId(SKELETON_DATA_TEST_ID);

        expect(skeletonElements);
    });

    it("displays posts when successfully fetched", async () => {
        const expectedPosts = homeJson.data.children;
        renderWithProviders(<Feed />);

        expectedPosts.forEach(async (post) =>
            expect(
                await screen.findByText(post.data.author),
            ).toBeInTheDocument(),
        );
    });

    it.todo(
        "displays loading icon when reaching the end",
        // async () => {
        // const defaultQueryClient = new QueryClient({
        //     defaultOptions: {
        //         queries: {
        //             retry: false,
        //         },
        //     },
        // });
        // renderWithProviders(<Feed />, defaultQueryClient);
        // fireEvent.scroll(window, { target: { scrollY: 999 } });
        // }
    );
});
