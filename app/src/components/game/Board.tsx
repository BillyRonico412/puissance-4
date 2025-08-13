import { AlertWinner } from "@app/components/AlertWinner"
import { Cell } from "@app/components/game/Cell"
import { PieceAnimate } from "@app/components/game/PieceAnimate"
import { WinnerLine } from "@app/components/game/WinnerLine"
import { ImgBoard } from "@app/components/Images"
import { animationAtoms } from "@app/lib/animation"
import { gameAtoms } from "@app/lib/atom"
import { useAtomValue, useSetAtom } from "jotai"

export const Board = () => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const setCoordHover = useSetAtom(animationAtoms.coordHoverAtom)
	const drop = useAtomValue(animationAtoms.dropAtom)
	const dropCol = useSetAtom(animationAtoms.dropColAtom)
	const setImgBoardElement = useSetAtom(animationAtoms.imgBoardElementAtom)
	const onMove = (params: {
		clientX: number
		clientY: number
		currentTarget: HTMLElement
	}) => {
		if (drop) {
			return
		}
		setCoordHover({
			client: { x: params.clientX, y: params.clientY },
			offset: {
				x: params.clientX - params.currentTarget.getBoundingClientRect().left,
				y: params.clientY - params.currentTarget.getBoundingClientRect().top,
			},
		})
	}

	return (
		<div
			className="mt-16 relative"
			ref={(el) => {
				if (!el) {
					return
				}
				setImgBoardElement(el)
			}}
			onMouseMove={(e) => {
				onMove({
					clientX: e.clientX,
					clientY: e.clientY,
					currentTarget: e.currentTarget,
				})
			}}
			onMouseUp={() => {
				dropCol()
			}}
			onMouseLeave={() => {
				setCoordHover(undefined)
			}}
			onTouchMove={(e) => {
				if (e.touches.length === 0) {
					return
				}
				const touch = e.touches[0]
				onMove({
					clientX: touch.clientX,
					clientY: touch.clientY,
					currentTarget: e.currentTarget,
				})
			}}
			onTouchEnd={() => {
				dropCol()
				setCoordHover(undefined)
			}}
		>
			<ImgBoard className="w-full z-20 relative" />
			<PieceAnimate />
			<WinnerLine />
			{game.getBoardArray().map((value, index) => (
				<Cell key={index} index={index} value={value} />
			))}
			<AlertWinner />
		</div>
	)
}
