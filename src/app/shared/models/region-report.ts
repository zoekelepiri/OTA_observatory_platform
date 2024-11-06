import {PrefectureSimple} from "./prefecture-simple";

export interface RegionReport {
  id: number;
  name: string;
  unemploymentRate: number;
  criminalityRate: number;
  geom: any;
  prefectures: PrefectureSimple[];
  totalPrefectures: number;
  totalOTA: number;
}
