import { ImgRedPiece, ImgYellowPiece } from "@app/components/Images"
import { animationAtoms } from "@app/lib/animation"
import { gameAtoms } from "@app/lib/atom"
import { GameClass } from "@app/lib/game"
import { useAtomValue, useSetAtom } from "jotai"
import type { TargetAndTransition, Transition } from "motion/react"

export const PieceAnimate = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const sizePiece = useAtomValue(animationAtoms.sizePieceAtom)
	const Comp =
		game.playerTurn === GameClass.Player1 ? ImgRedPiece : ImgYellowPiece
	const coordHover = useAtomValue(animationAtoms.coordHoverAtom)
	const drop = useAtomValue(animationAtoms.dropAtom)
	const endDrop = useSetAtom(animationAtoms.endDropAtom)
	const animate: TargetAndTransition =
		drop === undefined
			? {
					left: coordHover?.offset?.x ?? "50%",
				}
			: {
					left: drop.coord.x,
					top: drop.coord.y,
				}
	const transition: Transition = {
		type: "tween",
		duration: 0.2,
		onComplete() {
			endDrop()
		},
	}

	return (
		<Comp
			className="piece absolute -top-16 -translate-x-1/2 z-100"
			style={{
				width: `${sizePiece}px`,
			}}
			animate={animate}
			transition={transition}
		/>
	)
}
