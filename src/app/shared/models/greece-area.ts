import {GreeceAreaTypeEnum} from "../enums/greece-area-type.enum";

export interface GreeceArea {
  id: number;
  regionId: number;
  prefectureId: number;
  name: string;
  type: GreeceAreaTypeEnum;
}
