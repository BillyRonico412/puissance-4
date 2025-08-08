import { ImgRedPiece, ImgYellowPiece } from "@app/components/Images"
import { animationAtoms } from "@app/lib/animation"
import { gameAtoms } from "@app/lib/atom"
import { cn } from "@app/lib/utils"
import { useAtomValue, useSetAtom } from "jotai"
import { match } from "ts-pattern"

export const Cell = (props: { index: number; value: number }) => {
	const game = useAtomValue(gameAtoms.gameAtom)
	const { row, col } = game.getRowAndColFromIndex(props.index)
	const colHover = useAtomValue(animationAtoms.colHoverAtom)
	const setSizePiece = useSetAtom(animationAtoms.sizePieceAtom)
	const cell = game.getCell(row, col)
	return (
		<div
			className={cn(`row-${row} col-${col} cell-${row}-${col}`, "p-0.5")}
			ref={(el) => {
				if (!el) {
					return
				}
				const rect = el.getBoundingClientRect()
				const size = Math.min(rect.width, rect.height)
				setSizePiece(size - 4)
			}}
		>
			<div className="w-full aspect-square p-0.5 rounded-full border-t-2 -rotate-45 border-bleu-ciel">
				<div
					className={cn(
						"w-full aspect-square bg-white rounded-full transition-colors cell",
						{
							"bg-gray-400": colHover === col,
						},
					)}
				>
					{match(cell)
						.with(1, () => <ImgRedPiece className="w-full" />)
						.with(2, () => <ImgYellowPiece className="w-full" />)
						.otherwise(() => (
							<></>
						))}
				</div>
			</div>
		</div>
	)
}
