export enum Figures {
  KING = "KING",
  QUEEN = "QUEEN",
  BISHOP = "BISHOP",
  KNIGHT = "KNIGHT",
  ROOK = "ROOK",
  PAWN = "PAWN",
}

export enum Colors {
  WHITE = "WHITE",
  BLACK = "BLACK",
}

export const BOARD_SIZE = 8;

export interface Coordinates {
  x: number;
  y: number;
}

export interface BoardCell extends Coordinates {
  color: Colors;
}

export interface FigureInterface extends Coordinates {
  type: Figures;
  color: Colors;
}

export const initialFigurePositions = [
  { color: Colors.BLACK, type: Figures.KING, x: 4, y: 0 },
  { color: Colors.BLACK, type: Figures.QUEEN, x: 3, y: 0 },
  { color: Colors.BLACK, type: Figures.BISHOP, x: 5, y: 0 },
  { color: Colors.BLACK, type: Figures.BISHOP, x: 2, y: 0 },
  { color: Colors.BLACK, type: Figures.KNIGHT, x: 6, y: 0 },
  { color: Colors.BLACK, type: Figures.KNIGHT, x: 1, y: 0 },
  { color: Colors.BLACK, type: Figures.ROOK, x: 7, y: 0 },
  { color: Colors.BLACK, type: Figures.ROOK, x: 0, y: 0 },

  { color: Colors.BLACK, type: Figures.PAWN, x: 0, y: 1 },
  { color: Colors.BLACK, type: Figures.PAWN, x: 1, y: 1 },
  { color: Colors.BLACK, type: Figures.PAWN, x: 2, y: 1 },
  { color: Colors.BLACK, type: Figures.PAWN, x: 3, y: 1 },
  { color: Colors.BLACK, type: Figures.PAWN, x: 4, y: 1 },
  { color: Colors.BLACK, type: Figures.PAWN, x: 5, y: 1 },
  { color: Colors.BLACK, type: Figures.PAWN, x: 6, y: 1 },
  { color: Colors.BLACK, type: Figures.PAWN, x: 7, y: 1 },

  { color: Colors.WHITE, type: Figures.KING, x: 3, y: 7 },
  { color: Colors.WHITE, type: Figures.QUEEN, x: 4, y: 7 },
  { color: Colors.WHITE, type: Figures.BISHOP, x: 5, y: 7 },
  { color: Colors.WHITE, type: Figures.BISHOP, x: 2, y: 7 },
  { color: Colors.WHITE, type: Figures.KNIGHT, x: 6, y: 7 },
  { color: Colors.WHITE, type: Figures.KNIGHT, x: 1, y: 7 },
  { color: Colors.WHITE, type: Figures.ROOK, x: 7, y: 7 },
  { color: Colors.WHITE, type: Figures.ROOK, x: 0, y: 7 },

  { color: Colors.WHITE, type: Figures.PAWN, x: 0, y: 6 },
  { color: Colors.WHITE, type: Figures.PAWN, x: 1, y: 6 },
  { color: Colors.WHITE, type: Figures.PAWN, x: 2, y: 6 },
  { color: Colors.WHITE, type: Figures.PAWN, x: 3, y: 6 },
  { color: Colors.WHITE, type: Figures.PAWN, x: 4, y: 6 },
  { color: Colors.WHITE, type: Figures.PAWN, x: 5, y: 6 },
  { color: Colors.WHITE, type: Figures.PAWN, x: 6, y: 6 },
  { color: Colors.WHITE, type: Figures.PAWN, x: 7, y: 6 },
];
