import { Header } from "@app/components/Header"
import { MainLayout, MainLayoutBody } from "@app/components/MainLayout"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/$mode")({
	component: RouteComponent,
	beforeLoad({ params }) {
		if (params.mode !== "online" && params.mode !== "offline") {
			throw notFound()
		}
	},
})

function RouteComponent() {
	return (
		<MainLayout>
			<Header />
			<MainLayoutBody>
				<Outlet />
			</MainLayoutBody>
		</MainLayout>
	)
}
