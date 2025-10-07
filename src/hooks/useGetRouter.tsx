/**
 * This File contains Hook, that will be used to integrate both react router with react query for App.tsx
 */

import { QueryClient } from "@tanstack/react-query"
import { createRouter } from "@tanstack/react-router"
import { setupRouterSsrQueryIntegration} from "@tanstack/react-router-ssr-query"

import { routeTree } from "@/routeTree.gen"


/**
 * - This hook basically integrate react router and react query, so that I can use both :)
 * - Helps to cleanly define it in App.tsx 
 */
export function useGetRouter(){
    const queryClient = new QueryClient();
    const router = createRouter({ 
        routeTree,
        defaultNotFoundComponent: () => (<div> This page is not found bruh :(</div>),

        // optionally expose the QueryClient via router context
        context: { queryClient },
        scrollRestoration: true,
        defaultPreload: 'intent',
    });


    setupRouterSsrQueryIntegration({
        router,
        queryClient,

        // optional:
        // handleRedirects: true,
        // wrapQueryClient: true,
    })

    return router;

}