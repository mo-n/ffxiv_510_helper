
import itemInfo from "utils/item";
import { Material } from "utils/recipe";

interface AppItemProps {
  id: number;
  craft: Material;
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

export default AppItem;