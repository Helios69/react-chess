import {
  BoardInterface,
  BOARD_SIZE,
  Colors,
  Coordinates,
  FigureInterface,
  Figures,
  Obstacles,
} from "./types";

const sanitizeMoves = (
  moves: Coordinates[],
  board: BoardInterface,
  color: Colors
): { validMoves: Coordinates[]; captureMoves: Coordinates[] } => {
  const filteredMoves = moves.filter(
    ({ x, y }) => x < BOARD_SIZE && x >= 0 && y < BOARD_SIZE && y >= 0
  );

  return filteredMoves.reduce(
    (acc, curr) => {
      const { x, y } = curr;
      const isEnemyFigure = board[y][x].figure?.color !== color;
      const isEmptyCell = !board[y][x].figure;
      if (isEmptyCell) return { ...acc, validMoves: [...acc.validMoves, curr] };
      else if (isEnemyFigure)
        return { ...acc, captureMoves: [...acc.captureMoves, curr] };
      else return acc;
    },
    { validMoves: [] as Coordinates[], captureMoves: [] as Coordinates[] }
  );
};

export const getValidAndCaptureMoves = (
  { type, color, x, y }: FigureInterface,
  board: BoardInterface
): { validMoves: Coordinates[]; captureMoves: Coordinates[] } => {
  const validMoves: Coordinates[] = [];
  const obstacles: Obstacles = {};

  switch (type) {
    case Figures.PAWN:
      if (color === Colors.WHITE) {
        if (y === 6) {
          !board?.[y - 2]?.[x]?.figure && validMoves.push({ y: y - 2, x });
        }
        !board?.[y - 1]?.[x]?.figure && validMoves.push({ y: y - 1, x });
        board?.[y - 1]?.[x - 1]?.figure &&
          validMoves.push({ y: y - 1, x: x - 1 });
        board?.[y - 1]?.[x + 1]?.figure &&
          validMoves.push({ y: y - 1, x: x + 1 });
      } else {
        if (y === 1) {
          !board?.[y + 2]?.[x]?.figure && validMoves.push({ y: y + 2, x });
        }
        !board?.[y + 1]?.[x]?.figure && validMoves.push({ y: y + 1, x });
        board?.[y + 1]?.[x - 1]?.figure &&
          validMoves.push({ y: y + 1, x: x - 1 });
        board?.[y + 1]?.[x + 1]?.figure &&
          validMoves.push({ y: y + 1, x: x + 1 });
      }
      break;
    case Figures.KNIGHT:
      validMoves.push({ y: y + 2, x: x + 1 });
      validMoves.push({ y: y + 2, x: x - 1 });
      validMoves.push({ y: y - 2, x: x + 1 });
      validMoves.push({ y: y - 2, x: x - 1 });
      validMoves.push({ y: y + 1, x: x + 2 });
      validMoves.push({ y: y + 1, x: x - 2 });
      validMoves.push({ y: y - 1, x: x + 2 });
      validMoves.push({ y: y - 1, x: x - 2 });
      break;
    case Figures.BISHOP:
      for (let i = 1; i < BOARD_SIZE; i++) {
        !obstacles.bottomRight && validMoves.push({ x: x + i, y: y + i });
        !obstacles.bottomLeft && validMoves.push({ x: x - i, y: y + i });
        !obstacles.topRight && validMoves.push({ x: x + i, y: y - i });
        !obstacles.topLeft && validMoves.push({ x: x - i, y: y - i });

        obstacles.bottomRight = !!board?.[y + i]?.[x + i]?.figure;
        obstacles.bottomLeft = !!board?.[y + i]?.[x - i]?.figure;
        obstacles.topRight = !!board?.[y - i]?.[x + i]?.figure;
        obstacles.topLeft = !!board?.[y - i]?.[x - i]?.figure;
      }
      break;
    case Figures.KING:
      validMoves.push({ x: x + 1, y });
      validMoves.push({ x: x - 1, y });
      validMoves.push({ x, y: y + 1 });
      validMoves.push({ x, y: y - 1 });
      validMoves.push({ x: x + 1, y: y + 1 });
      validMoves.push({ x: x - 1, y: y - 1 });
      validMoves.push({ x: x + 1, y: y - 1 });
      validMoves.push({ x: x - 1, y: y + 1 });
      break;
    case Figures.ROOK:
      for (let i = 1; i < BOARD_SIZE; i++) {
        !obstacles.right && validMoves.push({ x: x + i, y });
        !obstacles.bottom && validMoves.push({ x, y: y + i });
        !obstacles.left && validMoves.push({ x: x - i, y });
        !obstacles.top && validMoves.push({ x, y: y - i });

        if (board?.[y]?.[x + i]?.figure) obstacles.right = true;
        if (board?.[y]?.[x - i]?.figure) obstacles.left = true;
        if (board?.[y + i]?.[x]?.figure) obstacles.bottom = true;
        if (board?.[y - i]?.[x]?.figure) obstacles.top = true;
      }
      break;
    case Figures.QUEEN:
      for (let i = 1; i < BOARD_SIZE; i++) {
        !obstacles.bottomRight && validMoves.push({ x: x + i, y: y + i });
        !obstacles.bottomLeft && validMoves.push({ x: x - i, y: y + i });
        !obstacles.topRight && validMoves.push({ x: x + i, y: y - i });
        !obstacles.topLeft && validMoves.push({ x: x - i, y: y - i });
        !obstacles.right && validMoves.push({ x: x + i, y });
        !obstacles.bottom && validMoves.push({ x, y: y + i });
        !obstacles.left && validMoves.push({ x: x - i, y });
        !obstacles.top && validMoves.push({ x, y: y - i });

        if (board?.[y]?.[x + i]?.figure) obstacles.right = true;
        if (board?.[y]?.[x - i]?.figure) obstacles.left = true;
        if (board?.[y + i]?.[x]?.figure) obstacles.bottom = true;
        if (board?.[y - i]?.[x]?.figure) obstacles.top = true;
        if (board?.[y + i]?.[x + i]?.figure) obstacles.bottomRight = true;
        if (board?.[y + i]?.[x - i]?.figure) obstacles.bottomLeft = true;
        if (board?.[y - i]?.[x + i]?.figure) obstacles.topRight = true;
        if (board?.[y - i]?.[x - i]?.figure) obstacles.topLeft = true;
      }
  }

  return sanitizeMoves(validMoves, board, color);
};
