import AppItem from "components/AppItem";
import allegory from "assets/icon/65075.png";
import { MarketPurchase } from "components/Icons";
import { Material as Craft } from "utils/recipe";

interface Props {
  list: Map<number, Craft>;
}

// 兑换
function Vendors(props: Props) {
  const list = props.list;
  const vendorslist = Array.from(list).filter(
    ([id]) => id > 32943 && id < 32950
  );

  return (
    <div className="px-6 flex flex-col h-full">
      <div className="text-center py-1 text-lg border-gray-300 border-solid border-b relative">
        <span>兑换材料</span>
        <span className="absolute transform translate-y-0.5 right-4 text-base leading-4">
          <i className="w-6 h-6 inline-block align-text-top">
            <img src={allegory} alt="" />
          </i>
          ×
          {vendorslist.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue[1].amount * 20,
            0
          )}
        </span>
      </div>
      <div className="relative flex-1">
        {
          vendorslist.length === 0 ? (
            <MarketPurchase className="w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          ) : (
            vendorslist.map(([id, craft]) => (
              <AppItem key={id} id={id} craft={craft} />
            ))
          )
        }
      </div>
    </div>
  );
}

export default Vendors;
