import {PrefectureCapital} from "./prefecture-capital";

export interface PrefectureGeomSimple {
  id: number;
  nameGr: string;
  nameEn: string;
  population: number;
  capital: PrefectureCapital;
  shapeArea: number;
  geom: any;
}
