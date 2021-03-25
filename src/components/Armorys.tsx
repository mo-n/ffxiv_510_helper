import React, { useState } from "react";
import InputNumber from "rc-input-number";
import { Slot, Suit, Store, suitInfo } from "store";
import {
  UpIcon,
  BottomIcon,
  ArmouryHead,
  ArmouryBody,
  ArmouryHands,
  ArmouryWaist,
  ArmouryLegs,
  ArmouryFeet,
  ArmouryEarrings,
  ArmouryNecklace,
  ArmouryRing,
  ArmouryBracelets,
  tankIcon,
  tankIconFilled,
  healerIcon,
  healerIconFilled,
  dpsMagicIcon,
  dpsMagicIconFilled,
  rangedIcon,
  rangedIconFilled,
  dpsMeleeIcon,
  dpsMeleeFilledIcon,
  dragoonIcon,
  dragoonFilledIcon,
  ninjaIcon,
  ninjaFilledIcon,
} from "components/Icons";

const jobs = [
  { id: Suit.Tank, icon: tankIcon, iconFilled: tankIconFilled },
  { id: Suit.Healer, icon: healerIcon, iconFilled: healerIconFilled },
  { id: Suit.DpsMagic, icon: dpsMagicIcon, iconFilled: dpsMagicIconFilled },
  { id: Suit.Ranged, icon: rangedIcon, iconFilled: rangedIconFilled },
  { id: Suit.MonkSamurai, icon: dpsMeleeIcon, iconFilled: dpsMeleeFilledIcon },
  { id: Suit.Dragoon, icon: dragoonIcon, iconFilled: dragoonFilledIcon },
  { id: Suit.Ninja, icon: ninjaIcon, iconFilled: ninjaFilledIcon },
];

const armoryChests = [
  { id: Slot.Head, Icon: ArmouryHead, order: 1 },
  { id: Slot.Body, Icon: ArmouryBody, order: 3 },
  { id: Slot.Hands, Icon: ArmouryHands, order: 5 },
  { id: Slot.Waist, Icon: ArmouryWaist, order: 7 },
  { id: Slot.Legs, Icon: ArmouryLegs, order: 9 },
  { id: Slot.Feet, Icon: ArmouryFeet, order: 11 },
  { id: Slot.Earrings, Icon: ArmouryEarrings, order: 2 },
  { id: Slot.Necklace, Icon: ArmouryNecklace, order: 4 },
  { id: Slot.Bracelets, Icon: ArmouryBracelets, order: 6 },
  { id: Slot.ring, Icon: ArmouryRing, order: 8 },
];

interface Props {
  store: Store;
}

function Armorys(props: Props) {
  const store = props.store;

  const [currentJob, setCurrentJob] = useState(Suit.Tank);
  const [hover, sethover] = useState(new Array(7).fill(false));

  function addSuit(suit: Suit) {
    armoryChests.forEach(({ id }) => {
      const armor = store.getArmor(suit, id)!;
      if (id === Slot.ring) store.setArmor(suit, id, armor + 2);
      else store.setArmor(suit, id, armor + 1);
    });
  }

  return (
    <div className="w-96 bg-white">
      <div className="text-center py-1 text-lg border-gray-300 border-solid border-b">
        防具：{suitInfo.get(currentJob)!.name}
      </div>
      <div className="flex">
        <div className="flex justify-around py-2 w-10 mr-2 text-gray-800 border-gray-300 border-solid border-r box-content flex-wrap flex-none">
          {jobs.map(({ id, icon, iconFilled }, index) => (
            <button
              onMouseEnter={() => {
                const _hover = new Array(7).fill(false);
                _hover[index] = true;
                sethover(_hover);
              }}
              onMouseLeave={() => {
                sethover(new Array(7).fill(false));
              }}
              className="focus:outline-none"
              key={id}
              onClick={() => setCurrentJob(id)}
              title={suitInfo.get(id)!.name}
            >
              <img
                src={currentJob === id || hover[index] ? iconFilled : icon}
                className="w-8 h-8"
                alt="job icon"
              />
              <span className="hidden">{suitInfo.get(id)!.name}</span>
            </button>
          ))}
        </div>
        <div className="flex-auto py-4 flex flex-wrap">
          {armoryChests.map(({ Icon, id, order }) => {
            return (
              <div className={`flex flex-1 order-${order}`} key={id}>
                <Icon className="w-8 h-8 mr-2" />
                <InputNumber
                  className="w-24"
                  min={0}
                  max={99}
                  defaultValue={0}
                  value={store.getArmor(currentJob, id)}
                  upHandler={<UpIcon className="w-4" />}
                  downHandler={<BottomIcon className="w-4" />}
                  step={1}
                  onChange={(val) => {
                    store.setArmor(currentJob, id, val);
                  }}
                />
              </div>
            );
          })}
          <div className="flex-1 text-sm order-10 text-center">
            <button
              // onClick={() => store.armorsClear()}
              onClick={() => console.log(store.crafts)}
              className="h-8 w-24 ml-2 mx-auto bg-indigo-600 text-white rounded-md focus:outline-none"
            >
              清空
            </button>
          </div>
          <div className="flex-1 text-sm order-12 text-center">
            <button
              onClick={() => addSuit(currentJob)}
              className="h-8 w-24 ml-2 bg-indigo-600 text-white rounded-md focus:outline-none"
            >
              添加整套
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Armorys;
