import gatheringPotinData from "./gathering-point.json";

export type GatheringPotinInfo = {
  id: number;
  areaid: number;
  area: string;
  coords: Array<number>;
  lang: Array<string>;
  time: Array<number>;
  item: Array<number>;
};

const gatheringPotin: Map<number, GatheringPotinInfo> = new Map();

Object.keys(gatheringPotinData).forEach((k) => {
  const point = (gatheringPotinData as any)[k];
  gatheringPotin.set(Number(k), point);
});

export default gatheringPotin;
