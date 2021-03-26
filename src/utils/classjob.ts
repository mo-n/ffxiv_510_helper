import classjobData from "data/classjob.json";

enum Job {
  PLD = 19,
  MNK = 20,
  WAR = 21,
  DRG = 22,
  BRD = 23,
  WHM = 24,
  BLM = 25,
  SMN = 27,
  SCH = 28,
  NIN = 30,
  MCH = 31,
  DRK = 32,
  AST = 33,
  SAM = 34,
  RDM = 35,
  GNB = 37,
  DNC = 38,
}

const classjob: Map<
  Job,
  {
    lang: [string, string, string];
    ab: [string, string, string];
  }
> = new Map();

Object.keys(Job).forEach((k) => {
  const _job = Job[k as any];

  if (typeof _job === "number") {
    const _jobInfo = (classjobData as any)[String(_job)];
    classjob.set(_job, {
      lang: _jobInfo.lang,
      ab: _jobInfo.ab,
    });
  }
});

export { classjob, Job };
