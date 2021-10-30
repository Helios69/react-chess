import { useDefaultStore } from "../../stores/default";
import { Actions } from "../../stores/default/actions";
import { getValidAndCaptureMoves } from "../moveValidations";
import { Coordinates } from "../types";
import { coordinatesAreMatching } from "../utils";

const useFigure = (): any => {
  const [
    { board, activeFigure, validMoves, captureMoves, currentTurn },
    dispatch,
  ] = useDefaultStore();

  const setActiveFigure = (figureCoordinates: Coordinates): void => {
    const figure = board[figureCoordinates.y][figureCoordinates.x].figure;

    if (currentTurn === figure?.color) {
      const { validMoves, captureMoves } = getValidAndCaptureMoves(
        figure,
        board
      );
      dispatch({
        type: Actions.SET_ACTIVE_FIGURE,
        payload: { activeFigure: figure, validMoves, captureMoves },
      });
    }
  };

  const unsetActiveFigure = (): void => {
    dispatch({
      type: Actions.SET_ACTIVE_FIGURE,
      payload: { activeFigure: null, validMoves: [], captureMoves: [] },
    });
  };

  const changeFigurePosition = (newPosition: Coordinates) => {
    const isValidMove =
      !!validMoves.find((move) => coordinatesAreMatching(move, newPosition)) ||
      !!captureMoves.find((move) => coordinatesAreMatching(move, newPosition));

    if (isValidMove && !!activeFigure) {
      const updatedBoard = board.map((row) =>
        row.map((cell) => {
          if (coordinatesAreMatching(cell, newPosition)) {
            if (cell.figure) {
              console.log(cell);

              dispatch({
                type: Actions.CAPTURE,
                payload: { color: cell.figure.color, type: cell.figure.type },
              });
            }
            return { ...cell, figure: { ...activeFigure, ...newPosition } };
          } else if (coordinatesAreMatching(cell, activeFigure))
            return { ...cell, figure: null };
          else return cell;
        })
      );

      dispatch({ type: Actions.UPDATE_BOARD, payload: updatedBoard });
      dispatch({ type: Actions.CHANGE_TURN });
    }

    unsetActiveFigure();
  };

  return { setActiveFigure, unsetActiveFigure, changeFigurePosition };

  const checkForCheck = () => {};
};

export default useFigure;
