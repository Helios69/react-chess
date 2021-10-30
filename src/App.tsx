import { useEffect, useState } from "react";
import Board from "./common/components/Board";
import {
  BoardCell,
  Colors,
  FigureInterface,
  Figures,
  initialFigurePositions,
} from "./common/constants";
import { createBoard } from "./common/utils";

const App = () => {
  return (
    <div className="bg-gray-300 h-screen w-full flex items-center justify-center">
      <Board />
    </div>
  );
};

export default App;
