import {PrefectureCapital} from "./prefecture-capital";

export interface PrefectureSimple {
  id: number;
  nameGr: string;
  nameEn: string;
  population: number;
  capital: PrefectureCapital;
  shapeArea: number;
}
