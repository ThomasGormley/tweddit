import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { WhatsHappeningProvider } from "./hooks/whats-happening-context";
import { WhatsHappening } from "./whats-happening";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => require("next-router-mock"));

const WithProvider = ({ children }: { children: ReactNode }) => {
    return <WhatsHappeningProvider>{children}</WhatsHappeningProvider>;
};

const renderWhatsHappening = () => {
    render(<WhatsHappening />, { wrapper: WithProvider });
};

describe("<WhatsHappening />", () => {
    mockRouter.setCurrentUrl("/");
    it("should initially render a text submission form with only one input", async () => {
        renderWhatsHappening();
        screen.getByLabelText(/Submission title text/i);
        screen.getByPlaceholderText(/what's happening?/i);
        screen.getByRole("button", { name: /tweet/i });
    });

    it("should render post action buttons", () => {
        renderWhatsHappening();

        screen.getByRole("button", { name: /Submit a text based post/i });
        screen.getByRole("button", { name: /Submit a link based post/i });
        screen.getByRole("button", { name: /Add photos or video/i });
        screen.getByRole("button", { name: /Send replies to my inbox/i });
    });

    describe("when the user interacts with the link form", () => {
        it("should render additional form inputs", async () => {
            userEvent.setup();
            renderWhatsHappening();
            userEvent.click(
                screen.getByRole("textbox", { name: /Submission title text/i }),
            );

            await screen.findByLabelText(/submission body text/i);
            await screen.findByRole("button", { name: /home/i });
        });
    });

    describe('when the user clicks the "Submit a text based post" button', () => {
        it.skip("should render ");
    });
});
