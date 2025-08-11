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
	winner: Player | undefined = undefined
	constructor() {
		this.board = new Uint8Array(GameClass.NB_ROWS * GameClass.NB_COLS)
	}
	getBoardArray(): number[] {
		return Array.from(this.board)
	}
	getCell(row: number, col: number): Cell {
		if (
			row < 0 ||
			row >= GameClass.NB_ROWS ||
			col < 0 ||
			col >= GameClass.NB_COLS
		) {
			throw new Error("Invalid cell coordinates")
		}
		const index = row * GameClass.NB_COLS + col
		let cell: Cell = GameClass.EmptyCell
		if (this.board[index] === GameClass.Player1) {
			cell = GameClass.Player1
		} else if (this.board[index] === GameClass.Player2) {
			cell = GameClass.Player2
		}
		return cell
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
		this.board = new Uint8Array(GameClass.NB_ROWS * GameClass.NB_COLS)
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
		if (col < 0 || col >= GameClass.NB_COLS || !!this.winner) {
			throw new Error("Column out of bounds")
		}
		for (let row = GameClass.NB_ROWS - 1; row >= 0; row--) {
			if (this.getCell(row, col) === GameClass.EmptyCell) {
				this.setCell(row, col, this.playerTurn)
				this.playerTurn =
					this.playerTurn === GameClass.Player1
						? GameClass.Player2
						: GameClass.Player1
				this.updateWinner()
				return
			}
		}
		throw new Error("Column is full")
	}
	getNbPiecesLeft(player: Player): number {
		return (
			GameClass.NB_PIECES_PER_PLAYER -
			this.board.filter((cell) => cell === player).length
		)
	}
	getFreeRowForCol(col: number): number | undefined {
		if (col < 0 || col >= GameClass.NB_COLS) {
			throw new Error("Column out of bounds")
		}
		for (let row = GameClass.NB_ROWS - 1; row >= 0; row--) {
			if (this.getCell(row, col) === GameClass.EmptyCell) {
				return row
			}
		}
		return undefined
	}
	updateWinner() {
		const checkDirection = (row: number, col: number): Player | undefined => {
			const directions = [
				{ dr: 0, dc: 1 }, // Horizontal
				{ dr: 1, dc: 0 }, // Vertical
				{ dr: 1, dc: 1 }, // Diagonal down-right
				{ dr: 1, dc: -1 }, // Diagonal down-left
			]
			for (const { dr, dc } of directions) {
				let count = 0
				for (let i = 0; i < 4; i++) {
					const r = row + i * dr
					const c = col + i * dc
					if (
						r < 0 ||
						r >= GameClass.NB_ROWS ||
						c < 0 ||
						c >= GameClass.NB_COLS ||
						this.getCell(r, c) !== this.playerTurn
					) {
						break
					}
					count++
				}
				if (count === 4) {
					return this.playerTurn
				}
			}
			return undefined
		}
		for (let row = 0; row < GameClass.NB_ROWS; row++) {
			for (let col = 0; col < GameClass.NB_COLS; col++) {
				if (this.getCell(row, col) === this.playerTurn) {
					const winner = checkDirection(row, col)
					if (winner !== undefined) {
						this.winner = winner
						return
					}
				}
			}
		}
	}
}
