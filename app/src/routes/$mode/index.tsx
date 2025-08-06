import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/$mode/")({
	beforeLoad({ params }) {
		throw redirect({
			to: `/$mode/choose-opponent`,
			params: { mode: params.mode },
		})
	},
})
