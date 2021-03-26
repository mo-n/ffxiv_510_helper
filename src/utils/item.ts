import garetingItemData from "data/item.json";

export type ItemInfo = {
  id: number;
  rid?: string[];
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
  bpm: Array<Array<number>>;
  spm: Array<Array<number>>;
  actParm: Array<Array<number>>;
};

const item: Map<number, ItemInfo> = new Map();

Object.keys(garetingItemData).forEach((k) => {
  const point = (garetingItemData as any)[k];
  item.set(Number(k), point);
});

export default item;
