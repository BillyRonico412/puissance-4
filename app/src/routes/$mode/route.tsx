import { createFileRoute, notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/$mode")({
	component: RouteComponent,
	beforeLoad({ params }) {
		if (params.mode !== "online" && params.mode !== "offline") {
			throw notFound()
		}
	},
})

function RouteComponent() {
	return <div>Hello "/$mode"!</div>
}
