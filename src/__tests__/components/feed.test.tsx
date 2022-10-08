import { DATA_TEST_ID as SKELETON_DATA_TEST_ID } from "@/components/posts/post-skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { Feed } from "src/components/feed";
import mockRouter from "next-router-mock";
import homeJson from "mocks/data/reddit-home.json";
import { renderWithProviders } from "../__helpers__/render-utils";
jest.mock("next/router", () => require("next-router-mock"));

describe("<Feed />", () => {
    mockRouter.setCurrentUrl("/");

    it("displays loading skeleton when fetching", async () => {
        renderWithProviders(<Feed />);

        const skeletonElements = screen.getAllByTestId(SKELETON_DATA_TEST_ID);
        expect(skeletonElements);
    });

    it("displays posts when successfully fetched", async () => {
        renderWithProviders(<Feed />);
        const expectedPosts = homeJson.data.children;

        expectedPosts.forEach(async (post) =>
            expect(
                await screen.findByText(post.data.author),
            ).toBeInTheDocument(),
        );
    });
});
