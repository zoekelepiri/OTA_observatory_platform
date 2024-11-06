import {PrefectureCapital} from "./prefecture-capital";
import {Ota} from "./ota";

export interface Prefecture {
  id: number;
  nameGr: string;
  nameEn: string;
  population: number;
  capital: PrefectureCapital;
  otas: Ota[];
  shapeArea: number;
}
