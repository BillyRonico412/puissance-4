import { ImgRedPieces, ImgYellowPieces } from "@app/components/Images"
import { Card } from "@app/components/ui/card"
import { gameAtoms } from "@app/lib/atom"
import { GameClass, type Player } from "@app/lib/game"
import { cn } from "@app/lib/utils"
import { useAtomValue } from "jotai"
import type { HTMLAttributes } from "react"

const playerInfos = {
	[GameClass.Player1]: {
		nameAtom: gameAtoms.player1NameAtom,
		ImgPieces: ImgRedPieces,
	},
	[GameClass.Player2]: {
		nameAtom: gameAtoms.player2NameAtom,
		ImgPieces: ImgYellowPieces,
	},
} as const

const NbPiece = (
	props: { player: Player } & HTMLAttributes<HTMLDivElement>,
) => {
	const { nameAtom, ImgPieces } = playerInfos[props.player]
	const playerName = useAtomValue(nameAtom)
	const game = useAtomValue(gameAtoms.gameAtom)
	return (
		<Card
			{...props}
			className={cn(
				"flex flex-col gap-2 p-3",
				{
					"bg-primary text-primary-foreground":
						props.player === GameClass.Player1,
					"border-2 border-primary text-primary":
						props.player === GameClass.Player2,
				},
				props.className,
			)}
		>
			<p className="text-center font-medium text-lg italic">{playerName}</p>
			<div className="flex items-center gap-2 justify-center">
				<ImgPieces className="w-8" />
				<div>x {game.getNbPPiecesLeft(props.player)}</div>
			</div>
		</Card>
	)
}

export const NbPieces = () => {
	return (
		<div className="flex justify-center">
			<div className="flex flex-row justify-center gap-2 w-xs">
				<NbPiece player={GameClass.Player1} className="flex-1" />
				<NbPiece player={GameClass.Player2} className="flex-1" />
			</div>
		</div>
	)
}
