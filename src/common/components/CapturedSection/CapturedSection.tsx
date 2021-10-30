import { Colors, Figures } from "../../types";
import Figure from "../Figure";

const CapturedSection = ({
  figures,
  color,
}: {
  figures: Figures[];
  color: Colors;
}) => {
  const { pawns, specialFigures } = figures.reduce(
    (acc: any, figure) => {
      if (figure === Figures.PAWN)
        return { ...acc, pawns: [...acc.pawns, figure] };
      else return { ...acc, specialFigures: [...acc.specialFigures, figure] };
    },
    { pawns: [], specialFigures: [] }
  );

  return (
    <div className="w-16 flex items-center justify-center">
      {!!specialFigures.length && (
        <div className="w-8 flex flex-col">
          {specialFigures.map((figure: Figures, index: number) => (
            <div key={index} className="w-8">
              <Figure type={figure} x={0} y={0} color={color} />
            </div>
          ))}
        </div>
      )}
      {!!pawns.length && (
        <div className="w-8 flex flex-col">
          {pawns.map((figure: Figures, index: number) => (
            <div key={index} className="w-8">
              <Figure type={figure} x={0} y={0} color={color} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CapturedSection;
