import { gameAtoms } from "@app/lib/atom"
import { GameClass } from "@app/lib/game"
import { useAtomValue } from "jotai"

export const Turn = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const player1Name = useAtomValue(gameAtoms.player1NameAtom)
	const player2Name = useAtomValue(gameAtoms.player2NameAtom)
	return (
		<div className="flex flex-col items-center-safe gap-2">
			<p className="uppercase text-2xl font-bold italic">
				{game.playerTurn === GameClass.Player1 ? player1Name : player2Name}
			</p>
		</div>
	)
}
