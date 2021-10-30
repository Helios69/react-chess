import { BoardCell, BOARD_SIZE, Colors, Coordinates } from "./types";
import { initialFigurePositions } from "./constants";

export const createBoard = () => {
  const rows = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    const cols = [];
    const rowIsEven = y % 2 === 0;
    for (let x = 0; x < BOARD_SIZE; x++) {
      const color = rowIsEven !== (x % 2 === 0) ? Colors.WHITE : Colors.BLACK;
      const cell: BoardCell = {
        color,
        x,
        y,
        figure:
          initialFigurePositions.find((figure) =>
            coordinatesAreMatching(figure, { x: x, y: y })
          ) ?? null,
      };
      cols.push(cell);
    }
    rows.push(cols);
  }

  return rows;
};

export const coordinatesAreMatching = (
  coord1: Coordinates,
  coord2: Coordinates
) => {
  return coord1.x === coord2.x && coord1.y === coord2.y;
};

export const extractCoordinates = (e: any) => {
  const [x, y] = e.target.dataset.coordinates.split(":");
  return { x: +x, y: +y };
};
