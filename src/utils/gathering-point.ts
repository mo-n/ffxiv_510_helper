import gatheringPointData from "data/gathering-point.json";

export type GatheringPointInfo = {
  id: number;
  areaid: number;
  area: string;
  coords: Array<number>;
  lang: Array<string>;
  time: Array<number>;
  item: Array<number>;
};

const gatheringPoint: Map<number, GatheringPointInfo> = new Map();

Object.keys(gatheringPointData).forEach((k) => {
  const point = (gatheringPointData as any)[k];
  gatheringPoint.set(Number(k), point);
});

export default gatheringPoint;
