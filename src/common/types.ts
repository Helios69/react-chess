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

export interface FigureInterface extends Coordinates {
  type: Figures;
  color: Colors;
}

export interface BoardCell extends Coordinates {
  color: Colors;
  figure: FigureInterface | null;
}

export type BoardInterface = Array<Array<BoardCell>>;

export interface Obstacles {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
}
