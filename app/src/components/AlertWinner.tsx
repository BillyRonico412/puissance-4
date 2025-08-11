import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@app/components/ui/alert-dialog"
import { gameAtoms } from "@app/lib/atom"
import { useAtomValue } from "jotai"

export const AlertWinner = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	return (
		<AlertDialog>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Félicitations ! Le joueur {game.winner} a gagné !
					</AlertDialogTitle>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	)
}
