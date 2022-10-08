import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

export const defaultQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export function renderWithProviders(
    ui: React.ReactElement,
    client: QueryClient = defaultQueryClient,
) {
    const { rerender, ...result } = render(
        <QueryClientProvider client={client}>
            <SessionProvider>{ui}</SessionProvider>
        </QueryClientProvider>,
    );
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={client}>
                    <SessionProvider>{rerenderUi}</SessionProvider>
                </QueryClientProvider>,
            ),
    };
}

export const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
        <QueryClientProvider client={defaultQueryClient}>
            {children}
        </QueryClientProvider>
    );
};
