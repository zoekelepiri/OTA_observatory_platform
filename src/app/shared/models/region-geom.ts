import {PrefectureSimple} from "./prefecture-simple";

export interface RegionGeom {
  id: number;
  name: string;
  unemploymentRate: number;
  criminalityRate: number;
  geom: any;
  prefectures: PrefectureSimple[];
}
