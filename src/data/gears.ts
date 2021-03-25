import gearsData from 'data/gears.json';
import { ItemInfo } from './item';
import { Job } from 'data/classjob';

const gearsItem: Map<number, ItemInfo> = new Map();
Object.keys(gearsData).forEach((k) => {
  const point = (gearsData as any)[k];
  gearsItem.set(Number(k), point);
});

const job2arm = new Map([
  [Job.PLD, [31813, 31830]],
  [Job.MNK, [31814]],
  [Job.WAR, [31815]],
  [Job.DRG, [31816]],
  [Job.BRD, [31817]],
  [Job.WHM, [31821]],
  [Job.BLM, [31822]],
  [Job.SMN, [31823]],
  [Job.SCH, [31824]],
  [Job.NIN, [31818]],
  [Job.MCH, [31820]],
  [Job.DRK, [31819]],
  [Job.AST, [31825]],
  [Job.SAM, [31826]],
  [Job.RDM, [31827]],
  [Job.GNB, [31828]],
  [Job.DNC, [31829]]
])

class Gears {
  static getAll () {
    return gearsItem;
  }

  static get (id:number) {
    return gearsItem.get(id)
  }

  static search (classjobcategory: number[], uc: number, sc: number) {
    for (const gear of gearsItem.values()) {
      if (gear.uc === uc && gear.sc === sc && classjobcategory.includes(gear.jobs)) {
        return gear
      }
    }
    return null;
  }

  static searchJob (job: Job) {
    return job2arm.get(job)
  }
}

export default Gears;
