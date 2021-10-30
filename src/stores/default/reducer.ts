import { Colors } from "../../common/types";
import { Actions } from "./actions";
import { initialState, StateInterface } from "./Provider";

export type Action = {
  type: Actions;
  payload?: any;
};

const reducer = (
  state = initialState,
  { type, payload }: Action
): StateInterface => {
  switch (type) {
    case Actions.CREATE_BOARD:
      return { ...state, board: payload };
    case Actions.CHANGE_TURN:
      return {
        ...state,
        currentTurn:
          state.currentTurn === Colors.WHITE ? Colors.BLACK : Colors.WHITE,
      };
    case Actions.SET_ACTIVE_FIGURE:
      return { ...state, ...payload };
    case Actions.UPDATE_BOARD:
      return { ...state, board: payload };
    case Actions.CAPTURE:
      if (payload.color === Colors.WHITE) {
        return {
          ...state,
          capturedFigures: {
            ...state.capturedFigures,
            white: [...state.capturedFigures.white, payload.type],
          },
        };
      } else {
        return {
          ...state,
          capturedFigures: {
            ...state.capturedFigures,
            black: [...state.capturedFigures.black, payload.type],
          },
        };
      }

    default:
      throw new Error("Unhandled action type");
  }
};

export default reducer;
