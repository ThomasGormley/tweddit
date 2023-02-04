import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";
import { SubredditSwitcher } from "./subreddit-switcher";
import { renderWithProviders } from "src/__tests__/__helpers__/render-utils";

jest.mock("next/router", () => require("next-router-mock"));

const renderSubredditSwitcher = () => {
    renderWithProviders(<SubredditSwitcher />);
};

//TODO: continue when I add msw

describe("<SubredditSwitcher />", () => {
    mockRouter.setCurrentUrl("/");
    it("should accept user input", async () => {
        const user = userEvent.setup();
        renderSubredditSwitcher();

        const input = await screen.findByRole("combobox");

        await user.click(input);
        await user.type(input, "test");
        await screen.findByText(/search for a subreddit/i);
    });
});
