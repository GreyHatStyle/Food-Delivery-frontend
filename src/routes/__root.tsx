import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from './-navbar'
import Footer from './-footer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      
      <Navbar />
      
      <Outlet />

      <Footer/>
    </React.Fragment>
  )
}
