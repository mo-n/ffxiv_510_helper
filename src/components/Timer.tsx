import React, { useState, useEffect } from "react";
import gatheringpoint, { GatheringPointInfo } from "utils/gathering-point";
import Copy from "components/Copy";
import item from "utils/item";
import ezClock from "utils/eorzeaclock";
import EorzeClock from "utils/eorzeaclock";

const garertingList: Array<GatheringPointInfo> = [];
  Array.from(gatheringpoint.values()).forEach((point) => {
  garertingList[point.time[0] / 2] = point;
  garertingList[point.time[1] / 2] = point;
});

function getViewInfo() {  
  const eztime = new ezClock();
  const hour = eztime.getHours();

  const current = Math.floor(hour / 2);
  const next = current >= 11 ? 0 : current + 1;

  const endtime:ezClock = eztime.setHours(current * 2 + 2);

  return {
    endtime,
    current,
    next,
  };
}

function getcountdown(endtime:ezClock) {
  const eztime = new ezClock();
  return new Date(
    endtime.getEarthTime().getTime() - eztime.getEarthTime().getTime())
}

function Timer() {
  const [viewInfo, setView] = useState(getViewInfo);
  const {endtime, current, next } = viewInfo;

  const [countdown, setCountdown] = useState(getcountdown(endtime));

  useEffect(() => {
    const _timer = setInterval(() => {
      const seconds = countdown.getSeconds()

      if (countdown.getTime() <= 0) {
        const viewInfo = getViewInfo();
        setView(viewInfo)
        setCountdown(getcountdown(viewInfo.endtime))
      } else {
        setCountdown(new Date(countdown.setSeconds(seconds-1)))
      }
    }, 1000);

    return () => {
      clearInterval(_timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentPoint = garertingList[current],
    currentItem = item.get(currentPoint.item[0]),
    nextPoint = garertingList[next],
    nextItem = item.get(nextPoint.item[0]);

  return (
    <div className="py-4 px-4">
      <div>
        <div className="mb-1 py-1">
          <span className="text-3xl font-bold pr-2 inline-block cursor-pointer">
            <Copy text={currentItem?.lang[2]}>{currentItem?.lang[2]}</Copy>
          </span>
          <span className="text-base align-bottom">
            {EorzeClock.getMinuteSecondsString(countdown)}
          </span>
        </div>
        <div>
          <span>{currentPoint.area}</span>
          <span>
            -
            {`${currentPoint.lang[2]} (${currentPoint.coords[0]}, ${currentPoint.coords[1]})`}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <span>{nextItem?.lang[2]}</span>
          <span>-{nextPoint.area}</span>
          <span>
            -
            {`${nextPoint.lang[2]} (${nextPoint.coords[0]}, ${nextPoint.coords[1]})`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Timer;
