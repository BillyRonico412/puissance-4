import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@app/components/ui/alert-dialog"
import { Button } from "@app/components/ui/button"
import { gameAtoms } from "@app/lib/atom"
import { useNavigate } from "@tanstack/react-router"
import { useAtomValue } from "jotai"

export const AlertWinner = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const navigate = useNavigate()
	if (!game.winner) {
		return null
	}
	return (
		<AlertDialog open={true}>
			<AlertDialogContent className="flex flex-col items-center justify-center">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Félicitations ! Le joueur {game.winner.player} a gagné !
					</AlertDialogTitle>
				</AlertDialogHeader>
				<div className="flex flex-col gap-4 justify-center items-center">
					<AlertDialogAction asChild={true}>
						<Button
							onClick={() => {
								gameAtoms.gameProxy.reset()
							}}
						>
							Lancer une nouvelle partie
						</Button>
					</AlertDialogAction>
					<AlertDialogCancel asChild={true}>
						<Button
							onClick={() => {
								gameAtoms.gameProxy.reset()
								navigate({ to: ".." })
							}}
						>
							Revenir à la page d'accueil
						</Button>
					</AlertDialogCancel>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
