import { ImgGoogle, ImgLogo, ImgPieces } from "@app/components/Images"
import { MainLayout, MainLayoutBody } from "@app/components/MainLayout"
import { Button } from "@app/components/ui/button"
import { createFileRoute, Link, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: RouteComponent,
	beforeLoad() {
		if (window.localStorage.getItem("mode") === null) {
			return
		}
		switch (window.localStorage.getItem("mode")) {
			case "online":
				throw redirect({
					to: "/$mode/choose-opponent",
					params: { mode: "online" },
				})
			case "offline":
				throw redirect({
					to: "/$mode/choose-opponent",
					params: { mode: "offline" },
				})
		}
	},
})

function RouteComponent() {
	return (
		<MainLayout>
			<MainLayoutBody className="bg-primary flex flex-col justify-center-safe items-center-safe gap-4">
				<ImgLogo className="text-4xl" />
				<ImgPieces className="w-64 translate-y-8" />
				<div className="flex flex-col items-center gap-4 z-10">
					<Link to="/$mode/choose-opponent" params={{ mode: "online" }}>
						<Button variant="outline" size="lg" className="flex items-center">
							Se connecter
							<ImgGoogle className="w-6 -translate-y-0.5" />
						</Button>
					</Link>
					<Link to="/$mode/choose-opponent" params={{ mode: "offline" }}>
						<Button className="border-2" size="lg">
							Mode hors ligne
						</Button>
					</Link>
				</div>
			</MainLayoutBody>
		</MainLayout>
	)
}
