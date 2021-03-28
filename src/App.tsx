import React, {useState} from "react";
import { observer } from "mobx-react-lite";

import { Store } from "store";
import Timer from "components/Timer";
import Armorys from "components/Armorys";
import Arms from "components/Arms";
import Crafts from "components/Crafts";

import "./App.css";
import "assets/number.css";

function App() {
  // const EquipmentView = observer(Armorys);
  // const ArmsView = observer(Arms);
  // const CraftsView = observer(Crafts);
  const [store] = useState(() => new Store())

  return (
    <div className="App">
      <main className="grid grid-cols-4 gap-4">
        <div className="w-96 col-start-2 col-end-5">
          <Timer />
        </div>
        <div className="w-96 col-start-2">
          <Armorys store={store} />
        </div>
        {/* 半成品 */}
        <div className="w-96 col-start-3 row-span-3 col-end-5">
          <Crafts list={store.crafts} />
        </div>
        <div className="w-96 col-start-2">
          <Arms store={store} />
        </div>
        {/* 采集材料 */}
        <div>

        </div>
        {/* 列表 */}
        <div></div>
      </main>
    </div>
  );
}



export default observer(App);
