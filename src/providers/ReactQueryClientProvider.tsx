import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
        mutations: {
            onError(error) {
                if (error.message) {
                    alert(error.message);
                }
            },
        },
    },
};

const queryClient = new QueryClient(queryClientConfig);

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
