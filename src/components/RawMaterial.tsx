import { Material } from "utils/recipe";
import AppItem from "components/AppItem";
import { MarketPurchase } from "components/Icons";
interface Props {
  list: Map<number, Material>;
}

function RawMaterial(props: Props) {
  const { list } = props;
  const oldMaterial: Array<{ id: number; material: Material }> = [];
  const newMaterial: Array<{ id: number; material: Material }> = [];

  list.forEach((material, id) => {
    if (id > 32943 && id < 32950) return; // 过滤点数材料
    if (id > 30590) newMaterial.push({ id, material });
    else oldMaterial.push({ id, material });
  });

  oldMaterial.sort((first, second) => second.id - first.id);

  return (
    <div className="px-6 flex h-full flex-col">
      <div className="text-center py-1 text-lg border-gray-300 border-solid border-b">
        其他材料
      </div>
      <div className="relative flex-1">
        {list.size === 0 ? (
          <MarketPurchase className="w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <div>
            <div className="border-solid border-b">
              {newMaterial.map(({ id, material }) => (
                <AppItem key={id} id={id} craft={material} />
              ))}
            </div>
            <div>
              {oldMaterial.map(({ id, material }) => (
                <AppItem key={id} id={id} craft={material} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RawMaterial;
