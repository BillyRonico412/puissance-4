import { Board } from "@app/components/game/Board"
import { NbPieces } from "@app/components/game/NbPieces"
import { Turn } from "@app/components/game/Turn"

export const Game = () => {
	return (
		<div className="flex flex-col gap-8 w-full max-w-sm">
			<Turn />
			<Board />
			<NbPieces />
		</div>
	)
}
