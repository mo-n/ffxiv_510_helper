import itemInfo from "utils/item";
import AppItem from "components/AppItem";
import { MarketPurchase } from "components/Icons";
import { Material as Craft } from "utils/recipe";

interface Props {
  list: Map<number, Craft>;
}

function Crafts(props: Props) {
  const { list } = props;
  return (
    <div className="px-6 h-full flex flex-col">
      <div className="text-center py-1 text-lg border-gray-300 border-solid border-b">
        半成品
      </div>
      <div className="relative flex-1">
        {list.size === 0 ? (
          <MarketPurchase className="w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        ) : (
          <div className="min-h-full">
            <ol className="border-solid border-b">
              {Array.from(list)
                .filter(
                  ([id]) => itemInfo.get(id)?.rid && id > 32933 && id < 32938
                )
                .map(([id, craft]) => (
                  <AppItem key={id} id={id} craft={craft} />
                ))}
            </ol>
            <ol className="border-solid border-b">
              {Array.from(list)
                .filter(
                  ([id]) => itemInfo.get(id)?.rid && id > 32938 && id < 32944
                )
                .map(([id, craft]) => (
                  <AppItem key={id} id={id} craft={craft} />
                ))}
            </ol>
            <ol>
              {Array.from(list)
                .filter(
                  ([id]) =>
                    itemInfo.get(id)?.rid && itemInfo.get(id)?.ilv !== 510
                )
                .map(([id, craft]) => (
                  <AppItem key={id} id={id} craft={craft} />
                ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default Crafts;
