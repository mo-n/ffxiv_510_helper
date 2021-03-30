import { Material } from "utils/recipe";
import AppItem from "components/AppItem";
interface Props {
  list: Map<number, Material>;
}

function RawMaterial(props: Props) {
  const { list } = props;
  return (
    <div className="px-6">
      <div className="text-center py-1 text-lg border-gray-300 border-solid border-b">
        材料
      </div>
      <div>
        {Array.from(list).map(([id, craft]) => (
          <AppItem key={id} id={id} craft={craft} />
        ))}
      </div>
    </div>
  );
}

export default RawMaterial;
