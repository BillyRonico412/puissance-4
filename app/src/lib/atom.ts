import { GameClass } from "@app/lib/game"
import { atom } from "jotai"
import { atomWithProxy } from "jotai-valtio"
import { proxy } from "valtio"

const gameProxy = proxy(new GameClass())
const gameAtom = atomWithProxy(gameProxy)

const player1NamePrimitiveAtom = atom<string | undefined>(undefined)
const player2NamePrimitiveAtom = atom<string | undefined>(undefined)

const player1NameAtom = atom(
	(get) => get(player1NamePrimitiveAtom) || "Joueur 1",
)
const player2NameAtom = atom(
	(get) => get(player2NamePrimitiveAtom) || "Joueur 2",
)

export const gameAtoms = {
	gameAtom,
	gameProxy,
	player1NamePrimitiveAtom,
	player2NamePrimitiveAtom,
	player1NameAtom,
	player2NameAtom,
}
