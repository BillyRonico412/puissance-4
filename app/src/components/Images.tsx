import ImgBoardPieces from "@app/assets/board-pieces.png"
import ImgGoogle from "@app/assets/google.png"
import ImgPieces from "@app/assets/pieces.png"
import { cn } from "@app/lib/utils"
import type { HTMLAttributes } from "react"

export const LogoImg = (props: HTMLAttributes<HTMLImageElement>) => {
	return (
		<p
			{...props}
			className={cn("text-white text-lg font-black italic", props.className)}
		>
			PUISSANCE <span className="text-[#ffbc42]">4</span>
		</p>
	)
}

export const PiecesImg = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={ImgPieces} alt="Pieces" />
}

export const GoogleImg = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={ImgGoogle} alt="Google" />
}

export const BoardPiecesImg = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={ImgBoardPieces} alt="Board Pieces" />
}
