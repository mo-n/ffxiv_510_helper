import classjob from './classjob.json';


export default new Map(Object.entries(classjob)) as (Map<string, {
  id: number,
  lang: [string, string, string],
  ab: [string, string, string]
}>);
