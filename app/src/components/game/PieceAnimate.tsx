import { ImgRedPiece } from "@app/components/Images"
import { animationAtoms } from "@app/lib/animation"
import { gameAtoms } from "@app/lib/atom"
import { GameClass } from "@app/lib/game"
import { useAtomValue } from "jotai"

export const PieceAnimate = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const sizePiece = useAtomValue(animationAtoms.sizePieceAtom)
	const Comp = game.playerTurn === GameClass.Player1 ? ImgRedPiece : ImgRedPiece
	const offsetHover = useAtomValue(animationAtoms.offsetHoverAtom)
	return (
		<Comp
			className="piece absolute -top-16 -translate-x-1/2"
			style={{
				width: sizePiece,
			}}
			animate={{
				left: offsetHover?.x ?? "50%",
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
			}}
		/>
	)
}
