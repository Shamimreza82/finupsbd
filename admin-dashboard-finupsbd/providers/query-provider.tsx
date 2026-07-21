'use client';

import { ReactNode, useState, Suspense, lazy } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const ReactQueryDevtools = process.env.NODE_ENV === "development"
    ? lazy(() => import("@tanstack/react-query-devtools").then(m => ({ default: m.ReactQueryDevtools })))
    : () => null;

function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 10,
                retry: 1,
                refetchOnWindowFocus: false,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NODE_ENV === "development" && (
                <Suspense fallback={null}>
                    <ReactQueryDevtools initialIsOpen={false} />
                </Suspense>
            )}
        </QueryClientProvider>
    );
}
export default QueryProvider;