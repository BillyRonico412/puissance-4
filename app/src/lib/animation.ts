import { gameAtoms } from "@app/lib/atom"
import { atom } from "jotai"

type Coord = { x: number; y: number }

const coordHoverAtom = atom<
	| {
			client: Coord
			offset: Coord
	  }
	| undefined
>(undefined)

const elementUnderMouse = atom<HTMLElement | undefined>((get) => {
	const coordHover = get(coordHoverAtom)
	if (!coordHover) {
		return undefined
	}
	const { client } = coordHover
	const elementsUnderMouse = document.elementsFromPoint(client.x, client.y)
	for (const element of elementsUnderMouse) {
		for (const className of element.classList) {
			if (className.startsWith("col-")) {
				return element as HTMLElement
			}
		}
	}
})

const colHoverAtom = atom<number | undefined>((get) => {
	if (get(dropAtom)) {
		return undefined
	}
	const element = get(elementUnderMouse)
	if (!element) {
		return undefined
	}
	for (const className of element.classList) {
		if (className.startsWith("col-")) {
			return parseInt(className.split("-")[1])
		}
	}
	return undefined
})

const sizePieceAtom = atom<number | undefined>(undefined)
const dropAtom = atom<
	| {
			col: number
			coord: Coord
	  }
	| undefined
>(undefined)

const dropColAtom = atom(null, (get, set) => {
	console.log("dropColAtom called")
	const colHover = get(colHoverAtom)
	console.log("colHover", colHover)
	if (colHover !== undefined) {
		const row = get(gameAtoms.gameAtom).getRowForCol(colHover)
		if (row === undefined) {
			return
		}
		const cell = document.querySelector(`.cell-${row}-${colHover} .cell`)
		const board = document.querySelector(".board")
		if (!cell || !board) {
			return
		}
		set(dropAtom, {
			col: colHover,
			coord: {
				x:
					cell.getBoundingClientRect().left -
					board.getBoundingClientRect().left +
					cell.getBoundingClientRect().width / 2 -
					2,
				y:
					cell.getBoundingClientRect().top -
					board.getBoundingClientRect().top -
					2,
			},
		})
	}
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
	sizePieceAtom,
	dropAtom,
	dropColAtom,
	coordHoverAtom,
	endDropAtom,
}
