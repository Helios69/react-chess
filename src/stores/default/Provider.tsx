import {
  createContext,
  ReactChild,
  Reducer,
  useContext,
  useReducer,
} from "react";
import {
  Colors,
  Coordinates,
  FigureInterface,
  BoardInterface,
  Figures,
} from "../../common/types";
import reducer, { Action } from "./reducer";

export interface StateInterface {
  board: BoardInterface;
  currentTurn: Colors;
  activeFigure: FigureInterface | null;
  validMoves: Coordinates[];
  captureMoves: Coordinates[];
  capturedFigures: {
    white: Figures[];
    black: Figures[];
  };
}

export const initialState: StateInterface = {
  board: [],
  // figuresArrangement: initialFigurePositions,
  currentTurn: Colors.WHITE,
  activeFigure: null,
  validMoves: [],
  captureMoves: [],
  capturedFigures: {
    white: [],
    black: [],
  },
};

const StateContext = createContext<StateInterface>(initialState);
const DispatchContext = createContext<any>(undefined);

const DefaultProvider = ({ children }: { children: ReactChild }) => {
  const [state, dispatch] = useReducer<Reducer<StateInterface, Action>>(
    reducer,
    initialState
  );

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useDefaultState = (): StateInterface => {
  const state = useContext(StateContext);
  return state;
};

export const useDefaultDispatch = (): Function => {
  const dispatch = useContext(DispatchContext);
  return dispatch;
};

export const useDefaultStore = (): [StateInterface, Function] => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return [state, dispatch];
};

export default DefaultProvider;
