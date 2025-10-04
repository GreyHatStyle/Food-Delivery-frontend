import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ 
  routeTree,
  defaultNotFoundComponent: () => (<div> This page is not found bruh :(</div>) 
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {

  
    return (
       <RouterProvider router={router} />
    )
}

export default App
