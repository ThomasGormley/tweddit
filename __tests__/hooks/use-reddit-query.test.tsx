import useRedditQuery from "@/hooks/use-reddit-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { Session } from "next-auth";
import { SessionContextValue, useSession } from "next-auth/react";

jest.mock("next-auth");
jest.mock("next-auth/react");
// jest.mock("next-auth/router");

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "/",
        };
    },
}));

const mockSession: Session = {
    accessToken: "token",
    refreshToken: "token",
    expires: "token",
    user: {
        email: "test@test.com",
    },
};
const useSessionMockReturn: SessionContextValue = {
    data: mockSession,
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
    test("should render hook", async () => {
        (useSession as jest.Mock).mockReturnValue(useSessionMockReturn);

        const { result } = renderHook(() => useRedditQuery(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toBeDefined();
    });
});
