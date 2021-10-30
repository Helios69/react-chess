import { useEffect } from "react";
import Figure from "../Figure";
import CapturedSection from "../CapturedSection";
import {
  createBoard,
  extractCoordinates,
  coordinatesAreMatching,
} from "../../utils";
import { useDefaultStore } from "../../../stores/default";
import { Actions } from "../../../stores/default/actions";
import classNames from "classnames";
import useFigure from "../../hooks/useFigure";
import { Colors } from "../../types";

const Board = () => {
  const [{ captureMoves, board, validMoves, capturedFigures }, dispatch] =
    useDefaultStore();
  const { setActiveFigure, changeFigurePosition } = useFigure();

  useEffect(() => {
    dispatch({ type: Actions.CREATE_BOARD, payload: createBoard() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragStart = (e: any) => {
    const activeFigureCoords = extractCoordinates(e);

    setActiveFigure(activeFigureCoords, activeFigureCoords);
  };

  const onDrop = (e: any) => {
    const destinationCoords = extractCoordinates(e);
    changeFigurePosition(destinationCoords);
  };

  return (
    <div className="py-2 flex items-center justify-center bg-yellow-900">
      <CapturedSection color={Colors.BLACK} figures={capturedFigures.black} />
      <div className="flex w-64 h-64 flex-wrap box-border">
        {board.map((row) => {
          return row.map(({ color, x, y, figure }) => {
            const canMove = !!validMoves.find((move) =>
              coordinatesAreMatching(move, { x, y })
            );

            const canCapture = !!captureMoves.find((move) =>
              coordinatesAreMatching(move, { x, y })
            );

            return (
              <div
                key={`${x}:${y}`}
                className={classNames(
                  "w-8 relative h-8 flex items-center justify-center text-xs box-border",
                  {
                    "bg-gray-700": color === Colors.BLACK,
                    "bg-gray-200": color === Colors.WHITE,
                  }
                )}
              >
                <div
                  className={classNames(
                    "pointer-events-none absolute top-0 left-o w-full h-full opacity-60",
                    {
                      hidden: !canCapture && !canMove,
                      "bg-green-700": canMove,
                      "bg-red-700": canCapture,
                    }
                  )}
                />

                <div
                  draggable={!!figure}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragLeave={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                  data-coordinates={`${x}:${y}`}
                  className="w-full h-full"
                >
                  {figure && <Figure {...figure} />}
                </div>
              </div>
            );
          });
        })}
      </div>
      <CapturedSection color={Colors.WHITE} figures={capturedFigures.white} />
    </div>
  );
};

export default Board;
