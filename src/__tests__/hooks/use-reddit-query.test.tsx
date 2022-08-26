import useRedditQuery from "src/hooks/use-reddit-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import * as NextAuthReact from "next-auth/react";
import type { SessionContextValue } from "next-auth/react";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const useSessionMockReturn: SessionContextValue = {
    data: {
        accessToken: "token",
        refreshToken: "token",
        expires: "token",
        user: {
            email: "test@test.com",
        },
    },
    status: "authenticated",
};

const wrapper = ({ children }: { children: JSX.Element }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe("useRedditQuery", () => {
    mockRouter.setCurrentUrl("/");

    test("should render hook", async () => {
        const useSessionSpy = jest.spyOn(NextAuthReact, "useSession");
        useSessionSpy.mockReturnValue(useSessionMockReturn);

        const { result } = renderHook(() => useRedditQuery(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toBeDefined();
    });
});
