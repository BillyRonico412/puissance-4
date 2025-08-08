export type Player = typeof GameClass.Player1 | typeof GameClass.Player2
export type Cell = Player | typeof GameClass.EmptyCell

export class GameClass {
	static readonly Player1 = 1
	static readonly Player2 = 2
	static readonly EmptyCell = 0
	static readonly NB_ROWS = 6
	static readonly NB_COLS = 7
	static readonly NB_PIECES_PER_PLAYER =
		(GameClass.NB_ROWS * GameClass.NB_COLS) / 2
	board: Uint8Array
	playerTurn: Player = GameClass.Player1
	constructor() {
		this.board = new Uint8Array(GameClass.NB_ROWS * GameClass.NB_COLS)
	}
	getBoardArray(): number[] {
		return Array.from(this.board)
	}
	getCell(row: number, col: number): number {
		if (
			row < 0 ||
			row >= GameClass.NB_ROWS ||
			col < 0 ||
			col >= GameClass.NB_COLS
		) {
			throw new Error("Invalid cell coordinates")
		}
		return this.board[row * GameClass.NB_COLS + col]
	}
	setCell(row: number, col: number, value: Cell): void {
		if (
			row < 0 ||
			row >= GameClass.NB_ROWS ||
			col < 0 ||
			col >= GameClass.NB_COLS
		) {
			throw new Error("Invalid cell coordinates")
		}
		if (this.getCell(row, col) !== 0) {
			throw new Error("Cell is already occupied")
		}
		this.board[row * GameClass.NB_COLS + col] = value
	}
	reset(): void {
		this.board.fill(0)
	}
	getRowAndColFromIndex(index: number): { row: number; col: number } {
		if (index < 0 || index >= this.board.length) {
			throw new Error("Index out of bounds")
		}
		const row = Math.floor(index / GameClass.NB_COLS)
		const col = index % GameClass.NB_COLS
		return { row, col }
	}
	addPiece(col: number): void {
		if (col < 0 || col >= GameClass.NB_COLS) {
			throw new Error("Column out of bounds")
		}
		for (let row = GameClass.NB_ROWS - 1; row >= 0; row--) {
			if (this.getCell(row, col) === GameClass.EmptyCell) {
				this.setCell(row, col, this.playerTurn)
				this.playerTurn =
					this.playerTurn === GameClass.Player1
						? GameClass.Player2
						: GameClass.Player1
				return
			}
		}
		throw new Error("Column is full")
	}
	getNbPPiecesLeft(player: Player): number {
		return (
			GameClass.NB_PIECES_PER_PLAYER -
			this.board.filter((cell) => cell === player).length
		)
	}
}
