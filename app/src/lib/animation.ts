import { atom } from "jotai"

type Coord = { x: number; y: number }

const clientHoverAtom = atom<Coord | undefined>(undefined)
const offsetHoverAtom = atom<Coord | undefined>(undefined)

const elementUnderMouse = atom<HTMLElement | undefined>((get) => {
	const coordHover = get(clientHoverAtom)
	if (!coordHover) {
		return undefined
	}
	const { x, y } = coordHover
	const elementsUnderMouse = document.elementsFromPoint(x, y)
	for (const element of elementsUnderMouse) {
		for (const className of element.classList) {
			if (className.startsWith("col-")) {
				return element as HTMLElement
			}
		}
	}
})

const colHoverAtom = atom<number | undefined>((get) => {
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

export const animationAtoms = {
	colHoverAtom,
	sizePieceAtom,
	clientHoverAtom,
	offsetHoverAtom,
}
