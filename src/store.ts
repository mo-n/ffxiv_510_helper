import { action, makeAutoObservable, observable, computed } from "mobx";
import Gears from "utils/gears";
import { Job } from "utils/classjob";
import Recipe from "utils/recipe";
import itemInfo from "utils/item";

enum Slot {
  Head = 3,
  Body = 4,
  Hands = 5,
  Waist = 6,
  Legs = 7,
  Feet = 8,
  Earrings = 9,
  Necklace = 10,
  Bracelets = 11,
  ring = 12,
}

enum Suit {
  Tank,
  Healer,
  DpsMagic,
  Ranged,
  MonkSamurai,
  Dragoon,
  Ninja,
}

interface SuitInfo {
  name: string;
  classjobcategory: number[];
}

interface SlotInfo {
  uc: number;
  sc: number;
}

type SuitList = Map<Slot, number>;

const suitInfo: Map<Suit, SuitInfo> = new Map([
  [Suit.Tank, { name: "坦克", classjobcategory: [59] }],
  [Suit.Healer, { name: "治疗", classjobcategory: [64] }],
  [Suit.DpsMagic, { name: "法系", classjobcategory: [63] }],
  [Suit.Ranged, { name: "远敏", classjobcategory: [66, 105] }],
  [Suit.MonkSamurai, { name: "侍僧", classjobcategory: [65, 84] }],
  [Suit.Dragoon, { name: "龙骑", classjobcategory: [65, 84] }],
  [Suit.Ninja, { name: "忍者", classjobcategory: [103, 105] }],
]);

const slotInfo: Map<Slot, SlotInfo> = new Map([
  [Slot.Head, { uc: 34, sc: 31 }],
  [Slot.Body, { uc: 35, sc: 33 }],
  [Slot.Hands, { uc: 37, sc: 36 }],
  [Slot.Waist, { uc: 39, sc: 38 }],
  [Slot.Legs, { uc: 36, sc: 35 }],
  [Slot.Feet, { uc: 38, sc: 37 }],
  [Slot.Earrings, { uc: 41, sc: 40 }],
  [Slot.Necklace, { uc: 40, sc: 39 }],
  [Slot.Bracelets, { uc: 42, sc: 41 }],
  [Slot.ring, { uc: 43, sc: 42 }],
]);

type Id = number

class Store {
  // 防
  armors: Map<Suit, SuitList> = new Map();
  // 武
  arms: Map<Job, number> = new Map();
  // 兵<id,number>
  armorys: Map<Id, number> = new Map();

  constructor() {
    this.armorsInit();
    this.armsInit();
    makeAutoObservable(this, {
      armors: observable,
      armorsClear: action,
      setArmor: action,
      arms: observable,
      setArms: action,
      armsClear: action,
      armorys: observable,
      setArmorys: action,
      crafts: computed, // 半成品
    });
  }

  private armorsInit() {
    Object.keys(Suit).forEach((k) => {
      const _suit = Suit[k as any];
      if (typeof _suit === "number") {
        const armory: Map<Slot, number> = new Map();

        for (const _k in Slot) {
          const _slot = Slot[_k as any];
          if (typeof _slot === "number") {
            armory.set(_slot, 0);
          }
        }
        this.armors.set(_suit, armory);
      }
    });
  }
  getArmor(suit: Suit, slot: Slot) {
    const _armory = this.armors.get(suit)!;
    return _armory.get(slot);
  }

  setArmor(suit: Suit, slot: Slot, n: number) {
    const _armory = this.armors.get(suit)!;
    _armory.set(slot, n);

    const { classjobcategory } = suitInfo.get(suit)!;
    const { uc, sc } = slotInfo.get(slot)!;
    const gears = Gears.search(classjobcategory, uc, sc);

    this.setArmorys(gears!.id, n);
  }

  setArmorys(id: number, num: number) {
    this.armorys.set(id, num);
  }

  armorsClear() {
    this.armorsInit();

    for (const id of this.armorys.keys()) {
      const gear = Gears.get(id)!;
      for (const slot of slotInfo.values()) {
        if (slot.sc === gear.sc || slot.uc === gear.uc) {
          this.armorys.delete(id);
        }
      }
    }
  }

  private armsInit() {
    Object.keys(Job).forEach((k) => {
      const _job = Job[k as any];

      if (typeof _job === "number") {
        this.arms.set(_job, 0);
      }
    });
  }

  setArms(job: Job, val: number) {
    this.arms.set(job, val);

    const gear = Gears.searchJob(job);
    gear?.forEach((id) => {
      this.armorys.set(id, val);
    });
  }

  armsClear() {
    this.armsInit();

    Object.keys(Job).forEach((k) => {
      const _job = Job[k as any];
      if (typeof _job === "number") {
        const gear = Gears.searchJob(_job);
        gear?.forEach((id) => {
          this.armorys.set(id, 0);
        });
      }
    });
  }

  // 计算半成品
  get crafts() {
    const _crafts = new Map();
    this.armorys.forEach((num, gearid) => {
      const gear = Gears.get(gearid)!;
      if (gear.rid && gear.rid[0]) {
        const craft = Recipe.getCrafts(gear.rid[0], num);
        craft?.forEach(([id, n]) => {
          const newNum = _crafts.get(id) ? _crafts.get(id): n;
          _crafts.set(id, newNum);
        });
      } else {
        throw Error("not find rid");
      }
    });
    return _crafts;
  }
}

export { Slot, Store, Suit, suitInfo, slotInfo };
