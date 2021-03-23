import garetingItemData from "./item.json";

export type GaretingItemInfo = {
  id: number;
  lang: string[];
  icon: number;
  ilv: number;
  uc: number;
  sc: number;
  hq: boolean;
  dye: boolean;
  act: number;
  bon: number;
  reduce: boolean;
  elv: number;
  jobs: number;
  ms: number;
  jd: number;
  p: string;
  bpm: [];
  actParm: [];
};

const garetingItem: Map<number, GaretingItemInfo> = new Map();

Object.keys(garetingItemData).forEach((k) => {
  const point = (garetingItemData as any)[k];
  garetingItem.set(Number(k), point);
});

export default garetingItem;
