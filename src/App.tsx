import React from "react";
import { observer } from "mobx-react-lite";

import { Store } from "store";
// import Timer from "components/Timer";
import Armorys from "components/Armorys";
import Arms from "components/Arms";

import "./App.css";
import "assets/number.css";

const store = new Store()

function App() {
  const EquipmentView = observer(Armorys);
  const ArmsView = observer(Arms);
  return (
    <div className="App">
      <main className="grid">
        <div>
          {/* <Timer /> */}
        </div>
        <div>
          <EquipmentView store={store}></EquipmentView>
        </div>
        <div>
          <ArmsView store={store} />
        </div>
        {/* 点数 */}
        <div>

        </div>
        {/* 采集材料 */}
        <div>

        </div>
        {/* 半成品 */}
        <div>

        </div>
        {/* 列表 */}
        <div>

        </div>
      </main>
    </div>
  );
}

export default App;
