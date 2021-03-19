import { action, makeAutoObservable, observable } from "mobx";

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
  uc: string;
  sc: string;
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
  [Slot.Head, { uc: "34", sc: "31" }],
  [Slot.Body, { uc: "35", sc: "33" }],
  [Slot.Hands, { uc: "37", sc: "36" }],
  [Slot.Waist, { uc: "39", sc: "38" }],
  [Slot.Legs, { uc: "36", sc: "35" }],
  [Slot.Feet, { uc: "35", sc: "37" }],
  [Slot.Earrings, { uc: "41", sc: "40" }],
  [Slot.Necklace, { uc: "40", sc: "39" }],
  [Slot.Bracelets, { uc: "42", sc: "41" }],
  [Slot.ring, { uc: "43", sc: "42" }],
]);

class Store {
  armorys: Map<Suit, SuitList> = new Map();

  text = 1;

  constructor() {
    this.armorysInit();
    makeAutoObservable(this, {
      armorys: observable,
      armorysClear: action,
      addArmory: action,
      setArmor: action,
      text: observable,
      addText: action,
    });
  }

  private armorysInit() {
    const _armorys: Map<Suit, SuitList> = new Map();
    for (const _suit in Suit) {
      const armory: Map<Slot, number> = new Map();
      for (const _slot in Slot) {
        armory.set(Number(_slot), 0);
      }
      _armorys.set(Number(_suit), armory);
    }
    this.armorys = _armorys;
  }

  getArmor(job: Suit, slot: Slot) {
    const _armory = this.armorys.get(job)!;
    return _armory.get(slot);
  }
  setArmor(job: Suit, slot: Slot, n: number) {
    const _armory = this.armorys.get(job)!;
    _armory.set(slot, n);
  }

  armorysClear() {
    this.armorysInit();
  }

  addArmory(job: Suit) {
    const _armory = this.armorys.get(job)!;
    _armory.forEach((value, key) => {
      const _val = _armory.get(key)!;

      if (key === Slot.ring) _armory.set(key, _val + 2);
      else _armory.set(key, _val + 1);
    });
  }

  addText() {
    this.text += 1;
  }
}

export { Slot, Store, Suit as JobList, suitInfo, slotInfo };
