import { ImgRedPiece, ImgYellowPiece } from "@app/components/Images"
import { animationAtoms } from "@app/lib/animation"
import { gameAtoms } from "@app/lib/atom"
import { cn } from "@app/lib/utils"
import { useAtomValue } from "jotai"
import { match } from "ts-pattern"

export const Cell = (props: { index: number; value: number }) => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const { row, col } = game.getRowAndColFromIndex(props.index)
	const colHover = useAtomValue(animationAtoms.colHoverAtom)
	const cell = game.getCell(row, col)
	const spacingWidth = useAtomValue(animationAtoms.spacingWidthAtom)
	const pieceWidth = useAtomValue(animationAtoms.pieceWidthAtom)
	return (
		<div
			className={cn(
				`row-${row} col-${col} cell-${row}-${col}`,
				"absolute rounded-full z-10",
				{
					"bg-gray-400": colHover === col,
				},
			)}
			style={{
				left: `${spacingWidth * 2 + col * (pieceWidth + spacingWidth)}px`,
				top: `${spacingWidth * 2 + row * (pieceWidth + spacingWidth)}px`,
				width: `${pieceWidth + 1}px`,
				height: `${pieceWidth + 1}px`,
			}}
		>
			{match(cell)
				.with(1, () => <ImgRedPiece className="w-full -rotate-45" />)
				.with(2, () => <ImgYellowPiece className="w-full -rotate-45" />)
				.otherwise(() => (
					<></>
				))}
		</div>
	)
}
