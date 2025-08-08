import imgBoard from "@app/assets/board.png"
import imgBoardPieces from "@app/assets/board-pieces.png"
import imgGoogle from "@app/assets/google.png"
import imgPieces from "@app/assets/pieces.png"
import imgRedPiece from "@app/assets/red-piece.svg"
import imgRedPieces from "@app/assets/red-pieces.svg"
import imgYellowPiece from "@app/assets/yellow-piece.svg"
import imgYellowPieces from "@app/assets/yellow-pieces.svg"
import { cn } from "@app/lib/utils"
import { type HTMLMotionProps, motion } from "motion/react"
import type { HTMLAttributes } from "react"

export const ImgLogo = (props: HTMLAttributes<HTMLImageElement>) => {
	return (
		<p
			{...props}
			className={cn("text-white text-lg font-black italic", props.className)}
		>
			PUISSANCE <span className="text-[#ffbc42]">4</span>
		</p>
	)
}

export const ImgPieces = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={imgPieces} alt="Pieces" />
}

export const ImgGoogle = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={imgGoogle} alt="Google" />
}

export const ImgBoardPieces = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={imgBoardPieces} alt="Board Pieces" />
}

export const ImgBoard = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={imgBoard} alt="Board" />
}

export const ImgRedPiece = (
	props: HTMLMotionProps<"img"> & {
		ref?: (el: HTMLImageElement | null) => void
	},
) => {
	return (
		<motion.img {...props} ref={props.ref} src={imgRedPiece} alt="Red Piece" />
	)
}

export const ImgYellowPiece = (
	props: HTMLMotionProps<"img"> & {
		ref?: (el: HTMLImageElement | null) => void
	},
) => {
	return (
		<motion.img
			{...props}
			ref={props.ref}
			src={imgYellowPiece}
			alt="Yellow Piece"
		/>
	)
}

export const ImgRedPieces = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={imgRedPieces} alt="Red Pieces" />
}

export const ImgYellowPieces = (props: HTMLAttributes<HTMLImageElement>) => {
	return <img {...props} src={imgYellowPieces} alt="Yellow Pieces" />
}
