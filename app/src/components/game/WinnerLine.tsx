import { animationAtoms } from "@app/lib/animation"
import { useAtomValue } from "jotai"

export const WinnerLine = () => {
	const winnerLine = useAtomValue(animationAtoms.winnerLineAtom)
	console.log("WinnerLine", winnerLine)
	if (!winnerLine) {
		return null
	}
	const { x1, y1, x2, y2 } = winnerLine
	return (
		<svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
			<line
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
				stroke="white"
				strokeWidth="6"
				strokeLinecap="round"
				className="winner-line"
			/>
		</svg>
	)
}
