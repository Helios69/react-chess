import Figure from "../Figure";
import {
  BoardCell,
  Colors,
  Coordinates,
  FigureInterface,
  initialFigurePositions,
} from "../../constants";
import { useEffect, useState } from "react";
import { createBoard, getValidMoves } from "../../utils";
import classNames from "classnames";

const Board = () => {
  const [boardCells, setBoardCells] = useState<Array<Array<BoardCell>>>([]);
  const [activeFigure, setActiveFigure] = useState<FigureInterface | null>(
    null
  );
  const [currentValidMoves, setCurrentValidMoves] = useState<Coordinates[]>([]);
  const [figuresArrangement, setFiguresArrangement] = useState<
    Array<FigureInterface>
  >(initialFigurePositions);

  useEffect(() => {
    setBoardCells(createBoard());
  }, []);

  const onDrop = (e: any) => {
    const [x, y] = e.target.dataset.coordinates.split(":");
    const destinationCoords = { x: +x, y: +y };

    if (activeFigure) {
      const { moveIsValid } = getValidMoves(activeFigure, destinationCoords);
      if (moveIsValid) {
        const figureOnDestinationCoords = figuresArrangement.find(
          ({ x, y }) => x === destinationCoords.x && y === destinationCoords.y
        );

        const newArrangement = figuresArrangement.map((figure) =>
          figure.x === activeFigure.x && figure.y === activeFigure.y
            ? { ...figure, ...destinationCoords }
            : figure
        );

        if (!figureOnDestinationCoords) {
          setActiveFigure(null);
          setFiguresArrangement(newArrangement);
        } else {
          if (figureOnDestinationCoords.color !== activeFigure.color) {
            const filteredFigures = newArrangement.filter(
              ({ color, x, y }) =>
                figureOnDestinationCoords.x !== x ||
                figureOnDestinationCoords.y !== y ||
                color === activeFigure.color
            );
            setFiguresArrangement(filteredFigures);
          }
        }
      }
    }
    setActiveFigure(null);
    setCurrentValidMoves([]);
  };

  const onDragStart = (e: any) => {
    const [x, y] = e.target.dataset.coordinates.split(":");
    const activeFigureCoords = { x: +x, y: +y };
    const figure = figuresArrangement.find(
      ({ x, y }) => x === activeFigureCoords.x && y === activeFigureCoords.y
    );

    if (figure) {
      const { validMoves } = getValidMoves(figure);

      const filteredValidMoves = validMoves.filter(
        (move) =>
          !figuresArrangement.find(({ x, y, color }) => {
            return x === move.x && y === move.y && figure.color === color;
          })
      );
      setCurrentValidMoves(filteredValidMoves);
      setActiveFigure(figure);
    }
  };

  return (
    <div className="w-72 h-72 flex items-center justify-center bg-yellow-900">
      <div className="flex w-64 h-64 flex-wrap box-border">
        {boardCells.map((row, rowIndex) => {
          return row.map(({ color }, colIndex) => {
            const figure = figuresArrangement.find(
              ({ x, y }) => x === colIndex && y === rowIndex
            );

            const highlightCell = currentValidMoves.find(
              ({ x, y }) => x === colIndex && y === rowIndex
            );

            return (
              <div
                key={`${colIndex}:${rowIndex}`}
                className={classNames(
                  "w-8 relative h-8 flex items-center justify-center text-xs box-border",
                  {
                    "bg-gray-700": color === Colors.BLACK,
                    "bg-gray-200": color === Colors.WHITE,
                  }
                )}
              >
                {!!highlightCell && (
                  <div className="pointer-events-none absolute top-0 left-o w-full h-full opacity-60 bg-green-700" />
                )}
                {figure ? (
                  <div
                    draggable={true}
                    onDragEnter={(e) => e.preventDefault}
                    onDragLeave={(e) => e.preventDefault()}
                    onDragOver={(e) => e.preventDefault()}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                    data-coordinates={`${colIndex}:${rowIndex}`}
                    className="w-full h-full"
                  >
                    <Figure {...figure} />
                  </div>
                ) : (
                  <div
                    onDragEnter={(e) => e.preventDefault}
                    onDragLeave={(e) => e.preventDefault()}
                    onDragOver={(e) => e.preventDefault()}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                    data-coordinates={`${colIndex}:${rowIndex}`}
                    className="w-full h-full"
                  />
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Board;
