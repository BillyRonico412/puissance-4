import { gameAtoms } from "@app/lib/atom"
import { GameClass } from "@app/lib/game"
import { atom } from "jotai"

const SPACING = 4
const PIECE_WIDTH = 20
const BOARD_WIDTH = 7 * (PIECE_WIDTH + SPACING) - SPACING + 4 * SPACING // 240

type Coord = { x: number; y: number }

const coordHoverAtom = atom<
	| {
			client: Coord
			offset: Coord
	  }
	| undefined
>(undefined)

const imgBoardElementAtom = atom<HTMLElement | null>(null)

const boardWidthAtom = atom((get) => {
	const imgBoardElement = get(imgBoardElementAtom)
	if (!imgBoardElement) {
		return 0
	}
	const rect = imgBoardElement.getBoundingClientRect()
	return rect.width
})

const coefficient = atom((get) => {
	const boardWidth = get(boardWidthAtom)
	return boardWidth / BOARD_WIDTH
})

const spacingWidthAtom = atom((get) => {
	return SPACING * get(coefficient)
})

const pieceWidthAtom = atom((get) => {
	return PIECE_WIDTH * get(coefficient)
})

const colHoverAtom = atom<number | undefined>((get) => {
	if (get(dropAtom)) {
		return undefined
	}
	const coordHover = get(coordHoverAtom)
	const imgBoardElement = get(imgBoardElementAtom)
	if (!coordHover || !imgBoardElement) {
		return undefined
	}
	const spacingWidth = get(spacingWidthAtom)
	const pieceWidth = get(pieceWidthAtom)
	const col =
		(coordHover.offset.x - (spacingWidth * 3) / 2) / (pieceWidth + spacingWidth)
	if (col < 0 || col >= GameClass.NB_COLS) {
		return undefined
	}
	return Math.floor(col)
})

const dropAtom = atom<
	| {
			col: number
			coord: Coord
	  }
	| undefined
>(undefined)

const dropColAtom = atom(null, (get, set) => {
	const colHover = get(colHoverAtom)
	if (colHover === undefined) {
		return
	}
	const row = get(gameAtoms.gameAtom).getFreeRowForCol(colHover)
	if (row === undefined) {
		return
	}
	const cell = document.querySelector(`.cell-${row}-${colHover}`) as HTMLElement
	if (!cell) {
		return
	}
	set(dropAtom, {
		col: colHover,
		coord: {
			x: cell.offsetLeft + cell.offsetWidth / 2,
			y: cell.offsetTop,
		},
	})
	set(coordHoverAtom, undefined)
})

const endDropAtom = atom(null, (get, set) => {
	const drop = get(dropAtom)
	if (drop) {
		gameAtoms.gameProxy.addPiece(drop.col)
	}
	set(dropAtom, undefined)
})

export const animationAtoms = {
	colHoverAtom,
	dropAtom,
	dropColAtom,
	coordHoverAtom,
	imgBoardElementAtom,
	endDropAtom,
	spacingWidthAtom,
	pieceWidthAtom,
	boardWidthAtom,
}
