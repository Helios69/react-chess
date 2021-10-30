import { Colors, Figures } from "../../types";
import WhiteKing from "../../../assets/figures/white-king.png";
import BlackKing from "../../../assets/figures/black-king.png";
import WhiteQueen from "../../../assets/figures/white-queen.png";
import BlackQueen from "../../../assets/figures/black-queen.png";
import WhiteBishop from "../../../assets/figures/white-bishop.png";
import BlackBishop from "../../../assets/figures/black-bishop.png";
import WhiteKnight from "../../../assets/figures/white-knight.png";
import BlackKnight from "../../../assets/figures/black-knight.png";
import WhiteRook from "../../../assets/figures/white-rook.png";
import BlackRook from "../../../assets/figures/black-rook.png";
import WhitePawn from "../../../assets/figures/white-pawn.png";
import BlackPawn from "../../../assets/figures/black-pawn.png";

interface FigureProps {
  type: Figures;
  color: Colors;
  x: number;
  y: number;
}

const Figure = ({ type, color, x, y }: FigureProps) => {
  switch (type) {
    case Figures.KING:
      return (
        <img
          data-coordinates={`${x}:${y}`}
          src={color === Colors.BLACK ? BlackKing : WhiteKing}
          alt="king"
        />
      );

    case Figures.QUEEN:
      return (
        <img
          data-coordinates={`${x}:${y}`}
          src={color === Colors.BLACK ? BlackQueen : WhiteQueen}
          alt="queen"
        />
      );

    case Figures.ROOK:
      return (
        <img
          data-coordinates={`${x}:${y}`}
          src={color === Colors.BLACK ? BlackRook : WhiteRook}
          alt="rook"
        />
      );

    case Figures.BISHOP:
      return (
        <img
          data-coordinates={`${x}:${y}`}
          src={color === Colors.BLACK ? BlackBishop : WhiteBishop}
          alt="bishop"
        />
      );

    case Figures.KNIGHT:
      return (
        <img
          data-coordinates={`${x}:${y}`}
          src={color === Colors.BLACK ? BlackKnight : WhiteKnight}
          alt="knight"
        />
      );

    case Figures.PAWN:
      return (
        <img
          data-coordinates={`${x}:${y}`}
          src={color === Colors.BLACK ? BlackPawn : WhitePawn}
          alt="pawn"
        />
      );

    default:
      return null;
  }
};

export default Figure;
