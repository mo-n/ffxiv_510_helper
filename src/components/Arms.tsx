import React from "react";
import { Store } from "store";
import { Job } from "utils/classjob";
import {
  ClassJob19,
  ClassJob20,
  ClassJob21,
  ClassJob22,
  ClassJob23,
  ClassJob24,
  ClassJob25,
  ClassJob27,
  ClassJob28,
  ClassJob30,
  ClassJob31,
  ClassJob32,
  ClassJob33,
  ClassJob34,
  ClassJob35,
  ClassJob37,
  ClassJob38,
  UpIcon,
  BottomIcon,
} from "components/Icons";
import InputNumber from "rc-input-number";

const TankIcons = new Map([
  [Job.PLD, ClassJob19],
  [Job.WAR, ClassJob21],
  [Job.DRK, ClassJob32],
  [Job.GNB, ClassJob37],
]);

const HealerIcons = new Map([
  [Job.WHM, ClassJob24],
  [Job.SCH, ClassJob28],
  [Job.AST, ClassJob33],
]);

const DpsIcons = new Map([
  [Job.MNK, ClassJob20],
  [Job.DRG, ClassJob22],
  [Job.NIN, ClassJob30],
  [Job.SAM, ClassJob34],
  [Job.BLM, ClassJob25],
  [Job.SMN, ClassJob27],
  [Job.RDM, ClassJob35],
  [Job.BRD, ClassJob23],
  [Job.MCH, ClassJob31],
  [Job.DNC, ClassJob38],
]);

interface Props {
  store: Store;
}

interface NumberInputGroupProps {
  id: number;
  value: number;
  children: any;
  onChange: (n: number) => void;
}

function NumberInputGroup(props: NumberInputGroupProps) {
  const { value, children, onChange } = props;

  return (
    <div className="flex flex-1 justify-center my-1">
      {children}
      <InputNumber
        style={{ width: "100px" }}
        min={0}
        max={99}
        defaultValue={0}
        value={value}
        onChange={onChange}
        upHandler={<UpIcon className="w-4" />}
        downHandler={<BottomIcon className="w-4" />}
        step={1}
      />
    </div>
  );
}

function Arm(props: Props) {
  const store = props.store;

  return (
    <div className="bg-white">
      <div className="text-center py-1 mb-4 text-lg border-gray-300 border-solid border-b">
        武器
      </div>
      <div className="flex flex-wrap pb-4 justify-around">
        {Array.from(TankIcons).map(([id, Icon]) => (
          <NumberInputGroup
            key={id}
            id={id}
            value={store.arms.get(id)!}
            onChange={(val) => store.setArms(id, val)}
          >
            <Icon
              className={
                "w-8 h-8 mr-1 fill-current rounded-md bg-blue text-yellow border-yellow border-2"
              }
            ></Icon>
          </NumberInputGroup>
        ))}
        {Array.from(HealerIcons).map(([id, Icon]) => (
          <NumberInputGroup
            key={id}
            id={id}
            value={store.arms.get(id)!}
            onChange={(val) => store.setArms(id, val)}
          >
            <Icon
              className={
                "w-8 h-8 mr-1 fill-current rounded-md bg-green text-yellow border-yellow border-2"
              }
            ></Icon>
          </NumberInputGroup>
        ))}
        {Array.from(DpsIcons).map(([id, Icon]) => (
          <NumberInputGroup
            key={id}
            id={id}
            value={store.arms.get(id)!}
            onChange={(val) => store.setArms(id, val)}
          >
            <Icon
              className={
                "w-8 h-8 mr-1 fill-current rounded-md bg-red text-yellow border-yellow border-2"
              }
            ></Icon>
          </NumberInputGroup>
        ))}
        <div className="flex-1 text-center py-1">
          <button
            onClick={() => store.armsClear()}
            className="h-8 w-36 ml-2 bg-indigo-600 text-white rounded-md focus:outline-none"
          >
            清空
          </button>
        </div>
      </div>
    </div>
  );
}

export default Arm;
