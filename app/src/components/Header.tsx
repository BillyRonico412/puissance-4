import { LogoImg } from "@app/components/Images"
import { MainLayoutHeader } from "@app/components/MainLayout"
import { Button } from "@app/components/ui/button"
import { LucideCircleUserRound, LucideMenu } from "lucide-react"

export const Header = () => {
	return (
		<MainLayoutHeader className="bg-primary flex items-center">
			<LogoImg />
			<div className="flex items-center ml-auto gap-2">
				<Button size="icon">
					<LucideCircleUserRound size={22} />
				</Button>
				<Button size="icon">
					<LucideMenu size={22} />
				</Button>
			</div>
		</MainLayoutHeader>
	)
}
