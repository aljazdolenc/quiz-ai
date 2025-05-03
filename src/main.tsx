import {QueryClient} from "@tanstack/react-query";
import {createRouter as createTanStackRouter, Navigate, RouterProvider} from "@tanstack/react-router";
import {routerWithQueryClient} from "@tanstack/react-router-with-query";
import {routeTree} from "./routeTree.gen";
import ReactDOM from "react-dom/client";
import {StrictMode} from "react";
import '@/styles.css'

export function createRouter() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60, // 1 minute
            },
        },
    });

    return routerWithQueryClient(
        createTanStackRouter({
            routeTree,
            context: {queryClient},
            defaultPreload: "intent",
            defaultPreloadStaleTime: 0,
            // defaultErrorComponent: DefaultCatchBoundary,
            defaultNotFoundComponent: () => <Navigate to="/quiz" replace/>,
            scrollRestoration: true,
            defaultStructuralSharing: true,
        }),
        queryClient,
    );
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof createRouter>;
    }
}

const router = createRouter();
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <RouterProvider router={router}/>
        </StrictMode>,
    )
}
