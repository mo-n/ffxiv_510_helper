import React, { useState, useEffect } from "react";
import gatheringPotin, { GatheringPotinInfo } from "data/gathering-point";
import item from "data/item";
import ezClock from "data/eorzeaclock";

function getViewInfo() {
  const garertingList: Array<GatheringPotinInfo> = [];
  const eztime = new ezClock();
  const hour = eztime.getHours();

  Array.from(gatheringPotin.values()).forEach((point) => {
    garertingList[point.time[0] / 2] = point;
    garertingList[point.time[1] / 2] = point;
  });

  const current = Math.floor(hour / 2);
  const next = current >= 11 ? 0 : current + 1;
  return {
    eztimeStr: eztime.getHourMinuteString(),
    currentPoint: garertingList[current],
    currentGathering: item.get(garertingList[current].item[0]),
    nextPoint: garertingList[next],
    nextGathering: item.get(garertingList[next].item[0]),
  };
}

function Timer() {
  const [view, setView] = useState(getViewInfo);

  useEffect(() => {
    const _timer = setInterval(() => {
      setView(getViewInfo);
    }, 1000);

    return () => {
      clearInterval(_timer);
    };
  }, []);

  return (
    <div className="bg-white py-2 px-2">
      <div className="text-3xl font-semibold text-black">ET {view.eztimeStr}</div>
      <div>
        <div className="text-base text-rose-400">
          <span className="pr-2">{view.currentGathering!.lang[2]}</span>
          <span>{`${view.currentPoint.area} (${view.currentPoint.coords[0]}, ${view.currentPoint.coords[1]})`}</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="pr-2">{view.nextGathering!.lang[2]}</span>
          <span>{`${view.nextPoint.area} (${view.nextPoint.coords[0]}, ${view.nextPoint.coords[1]})`}</span>
        </div>
      </div>
    </div>
  );
}

export default Timer;
