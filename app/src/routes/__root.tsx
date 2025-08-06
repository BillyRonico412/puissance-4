import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
	component: RouteComponent,
	beforeLoad: () => {
		const queryClient = new QueryClient()
		return { queryClient }
	},
})

function RouteComponent() {
	const { queryClient } = Route.useRouteContext()
	return (
		<QueryClientProvider client={queryClient}>
			<div className="w-dvw h-dvh">
				<Outlet />
			</div>
		</QueryClientProvider>
	)
}
