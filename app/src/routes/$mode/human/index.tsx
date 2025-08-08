import { Game } from "@app/components/game/Game"
import { Button } from "@app/components/ui/button"
import { gameAtoms } from "@app/lib/atom"
import { createFileRoute } from "@tanstack/react-router"
import { LucideRefreshCcw } from "lucide-react"

export const Route = createFileRoute("/$mode/human/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="h-full flex flex-col justify-center-safe gap-16 items-center-safe">
			<Game />
			<Button
				size="lg"
				variant="outline"
				onClick={() => {
					gameAtoms.gameProxy.reset()
				}}
			>
				<LucideRefreshCcw />
				Recommencer la partie
			</Button>
		</div>
	)
}
