import { Cell } from "@app/components/game/Cell"
import { PieceAnimate } from "@app/components/game/PieceAnimate"
import { animationAtoms } from "@app/lib/animation"
import { gameAtoms } from "@app/lib/atom"
import { useAtomValue, useSetAtom } from "jotai"

export const Board = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const setClientHover = useSetAtom(animationAtoms.clientHoverAtom)
	const setOffsetHover = useSetAtom(animationAtoms.offsetHoverAtom)
	return (
		<div
			className="mt-16 relative board grid grid-rows-6 grid-cols-7 bg-primary rounded-3xl p-4 border-2 border-bleu-ciel shadow"
			onMouseMove={(e) => {
				setClientHover({
					x: e.clientX,
					y: e.clientY,
				})
				setOffsetHover({
					x: e.clientX - e.currentTarget.getBoundingClientRect().left,
					y: e.clientY - e.currentTarget.getBoundingClientRect().top,
				})
			}}
			onMouseLeave={() => {
				setClientHover(undefined)
				setOffsetHover(undefined)
			}}
			onTouchMove={(e) => {
				if (e.touches.length > 0) {
					setClientHover({
						x: e.touches[0].clientX,
						y: e.touches[0].clientY,
					})
					setOffsetHover({
						x:
							e.touches[0].clientX -
							e.currentTarget.getBoundingClientRect().left,
						y:
							e.touches[0].clientY -
							e.currentTarget.getBoundingClientRect().top,
					})
				}
			}}
			onTouchEnd={() => {
				setClientHover(undefined)
				setOffsetHover(undefined)
			}}
		>
			<PieceAnimate />
			{game.getBoardArray().map((value, index) => (
				<Cell key={index} index={index} value={value} />
			))}
		</div>
	)
}
