import {PrefectureSimple} from "./prefecture-simple";

export interface Region {
  id: number;
  name: string;
  unemploymentRate: number;
  criminalityRate: number;
  prefectures: PrefectureSimple[];
}
