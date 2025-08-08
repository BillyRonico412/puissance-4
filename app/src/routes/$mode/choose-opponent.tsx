import { ImgBoardPieces } from "@app/components/Images"
import { Button } from "@app/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"
import { LucideBot, LucideGlobe2, LucideUser2 } from "lucide-react"

export const Route = createFileRoute("/$mode/choose-opponent")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex flex-col items-center-safe justify-center-safe gap-12 h-full">
			<div>
				<p className="text-3xl font-bold italic">C'EST PARTI</p>
				<p>pour une nouvelle partie</p>
			</div>
			<ImgBoardPieces className="translate-x-5 w-72" />
			<div className="flex flex-col gap-4">
				<Route.Link to="/$mode/human">
					<Button size="lg" className="min-w-48">
						<LucideUser2 /> vs <LucideUser2 />
					</Button>
				</Route.Link>
				<Route.Link to="/$mode/online">
					<Button size="lg" className="min-w-48" variant="outline">
						<LucideUser2 /> vs <LucideGlobe2 />
					</Button>
				</Route.Link>
				<Route.Link to="/$mode/ai">
					<Button size="lg" className="min-w-48" variant="outline">
						<LucideUser2 /> vs <LucideBot />
					</Button>
				</Route.Link>
			</div>
		</div>
	)
}
