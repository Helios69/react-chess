import {
  BOARD_SIZE,
  Colors,
  Coordinates,
  FigureInterface,
  Figures,
} from "./constants";

export const createBoard = () => {
  const rows = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const cols = [];
    const rowIsEven = i % 2 === 0;
    for (let j = 0; j < BOARD_SIZE; j++) {
      const color = rowIsEven !== (j % 2 === 0) ? Colors.WHITE : Colors.BLACK;
      const cell = { color: color, x: i, y: j };
      cols.push(cell);
    }
    rows.push(cols);
  }

  return rows;
};

export const getValidMoves = (
  { type, color, x, y }: FigureInterface,
  destination?: Coordinates
): { validMoves: Coordinates[]; moveIsValid: boolean } => {
  const validMoves: Coordinates[] = [];
  switch (type) {
    case Figures.PAWN:
      if (color === Colors.WHITE) {
        if (y === 6) {
          validMoves.push({ y: y - 2, x });
        }
        if (y > 0) {
          validMoves.push({ y: y - 1, x });
        }
      } else {
        if (y === 1) {
          validMoves.push({ y: y + 2, x });
        }
        if (y < 7) {
          validMoves.push({ y: y + 1, x });
        }
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
        const negativeX = x - i;
        const negativeY = y - i;
        const positiveX = x + i;
        const positiveY = y + i;

        validMoves.push({ x: negativeX, y: negativeY });
        validMoves.push({ x: negativeX, y: positiveY });
        validMoves.push({ x: positiveX, y: positiveY });
        validMoves.push({ x: positiveX, y: negativeY });
      }
      break;
  }
  const moveIsValid = validMoves.find(
    ({ x, y }) => x === destination?.x && y === destination?.y
  );

  return { validMoves, moveIsValid: !!moveIsValid };
};
