import { Cell } from "@app/components/game/Cell"
import { PieceAnimate } from "@app/components/game/PieceAnimate"
import { animationAtoms } from "@app/lib/animation"
import { gameAtoms } from "@app/lib/atom"
import { useAtomValue, useSetAtom } from "jotai"

export const Board = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const setCoordHover = useSetAtom(animationAtoms.coordHoverAtom)
	const drop = useAtomValue(animationAtoms.dropAtom)
	const dropCol = useSetAtom(animationAtoms.dropColAtom)
	return (
		<div
			className="mt-16 relative board grid grid-rows-6 grid-cols-7 bg-primary rounded-3xl p-4 border-2 border-bleu-ciel shadow"
			onMouseMove={(e) => {
				if (drop) {
					return
				}
				setCoordHover({
					client: { x: e.clientX, y: e.clientY },
					offset: {
						x: e.clientX - e.currentTarget.getBoundingClientRect().left,
						y: e.clientY - e.currentTarget.getBoundingClientRect().top,
					},
				})
			}}
			onMouseUp={() => {
				dropCol()
				setCoordHover(undefined)
			}}
			onMouseLeave={() => {
				setCoordHover(undefined)
			}}
			onTouchMove={(e) => {
				if (e.touches.length === 0 || drop) {
					return
				}
				const touch = e.touches[0]
				setCoordHover({
					client: { x: touch.clientX, y: touch.clientY },
					offset: {
						x: touch.clientX - e.currentTarget.getBoundingClientRect().left,
						y: touch.clientY - e.currentTarget.getBoundingClientRect().top,
					},
				})
			}}
			onTouchEnd={() => {
				dropCol()
				setCoordHover(undefined)
			}}
		>
			<PieceAnimate />
			{game.getBoardArray().map((value, index) => (
				<Cell key={index} index={index} value={value} />
			))}
		</div>
	)
}
