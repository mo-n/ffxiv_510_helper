import React, {useState} from "react";
import { observer } from "mobx-react-lite";

import { Store } from "store";
import Timer from "components/Timer";
import Armorys from "components/Armorys";
import Arms from "components/Arms";
import Crafts from "components/Crafts";
import RawMaterial from "components/RawMaterial";
import Vendors from "components/Vendors";

import "./App.css";
import "assets/number.css";

function App() {
  // const EquipmentView = observer(Armorys);
  // const ArmsView = observer(Arms);
  // const CraftsView = observer(Crafts);
  const [store] = useState(() => new Store())

  return (
    <div className="App w-screen h-screen pt-8 overflow-hidden">
      <main className=" m-auto">
        <div className="grid auto-rows-max grid-cols-3 justify-items-center grid-flow-col gap-3 auto-cols-fr">
          <div className="w-full rounded shadow bg-white">
            <Timer />
          </div>
          <div className="w-full rounded shadow bg-white">
            <Armorys store={store} />
          </div>
          <div className="w-full rounded shadow bg-white">
            <Arms store={store} />
          </div>
          {/* 半成品 */}
          <div className="w-full rounded shadow row-span-2 bg-white">
            <Crafts list={store.crafts} />
          </div>
          <div className="w-full rounded shadow row-span-1 bg-white">
            <Vendors list={store.rawMaterial} />
          </div>
          {/* 素材 */}
          <div className="w-full rounded shadow row-span-3 bg-white">
            <RawMaterial list={store.rawMaterial}/>
          </div>
        </div>
      </main>
    </div>
  );
}



export default observer(App);
