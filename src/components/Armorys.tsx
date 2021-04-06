import gears from "utils/gears";
import Copy from "components/Copy";
import { ItemCommand } from "components/Icons";

interface Props {
  list: Map<number, number>;
}

function Armorys(props: Props) {
  const { list } = props;

  return (
    <div className="px-6 flex h-full flex-col">
      <div className="text-center py-1 text-lg border-gray-300 border-solid border-b">
        装备
      </div>
      <div className="relative flex-1">
        {list.size === 0 ? (
          <ItemCommand className="w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        ) : (
          Array.from(list).map(([id, number]) => (
            <div className="flex justify-around py-1 px-2">
              <div className="flex-1 cursor-pointer">
                <Copy text={gears.get(id)?.lang[2]}>{gears.get(id)?.lang[2]}</Copy>
              </div>
              <div>{number}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Armorys;
