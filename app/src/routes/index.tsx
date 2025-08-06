import { Header } from "@app/components/Header"
import { GoogleImg, LogoImg, PiecesImg } from "@app/components/Images"
import { MainLayout, MainLayoutBody } from "@app/components/MainLayout"
import { Button } from "@app/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<MainLayout>
			<Header />
			<MainLayoutBody className="bg-primary flex flex-col justify-center-safe items-center-safe gap-4">
				<LogoImg className="text-4xl" />
				<PiecesImg className="w-64 translate-y-8" />
				<div className="flex flex-col items-center gap-4 z-10">
					<Button variant="outline" size="lg" className="flex items-center">
						Se connecter
						<GoogleImg className="w-6 -translate-y-0.5" />
					</Button>
					<Button className="border-2" size="lg">
						Mode hors ligne
					</Button>
				</div>
			</MainLayoutBody>
		</MainLayout>
	)
}
