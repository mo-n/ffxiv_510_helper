import { useEffect, useState } from "react";
import itemInfo from "utils/item";
import { Craft } from "store";

interface Props {
  list: Map<number, Craft>;
}

interface AppItemProps {
  id: number;
  craft: Craft;
}

function AppItem(props: AppItemProps) {
  const { id, craft } = props;
  const name = itemInfo.get(id)!.lang[2];
  const amount = craft.amount;

  return (
    <li className="flex justify-around py-2 px-2">
      <div className="flex-1">{name}</div>
      <div className="">{amount}</div>
    </li>
  );
}

function Crafts(props: Props) {
  const { list } = props;

  return (
    <div className="bg-white px-6">
      <div className="text-center py-1 text-lg border-gray-300 border-solid border-b">
        半成品
      </div>
      <div>
        <div className="min-h-full">
          <ol className="border-solid border-b">
            {Array.from(list)
              .filter(([id]) => itemInfo.get(id)?.rid && id>32933 && id<32938)
              .map(([id, craft]) => (
                <AppItem key={id} id={id} craft={craft} />
              ))}
          </ol>
          <ol className="border-solid border-b">
            {Array.from(list)
              .filter(([id]) => itemInfo.get(id)?.rid && itemInfo.get(id)?.ilv !== 510)
              .map(([id, craft]) => (
                <AppItem key={id} id={id} craft={craft} />
              ))}
          </ol>
          <ol className="border-solid border-b">
            {Array.from(list)
              .filter(([id]) => itemInfo.get(id)?.rid && id>32938 && id<32944)
              .map(([id, craft]) => (
                <AppItem key={id} id={id} craft={craft} />
              ))}
          </ol>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Crafts;
