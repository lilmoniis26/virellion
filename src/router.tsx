import { createRootRoute, createRouter, createRoute } from '@tanstack/react-router'
import { RootLayout } from './routes/__root'
import { IndexPage } from './routes/index'
import { LoginPage } from './routes/login'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const routeTree = rootRoute.addChildren([indexRoute, loginRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}