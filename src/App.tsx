import { RouterProvider } from '@tanstack/react-router'
import { useGetRouter } from './hooks/useGetRouter'

// Registering the router instance for type safety (and vs code suggestions of course)
declare module '@tanstack/react-router' {
  interface Register {
    // router: typeof router
    router: ReturnType<typeof useGetRouter>
  }
}


function App() {
  const router = useGetRouter();
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
