  export interface AreaPerMonth {

  monthDate: Date;
  areaByPrefecture: AreaByPrefecture[];

}

export interface AreaByPrefecture {
  prefectureId: number;
  prefectureName: string;
  totalAreas: number; // to check
}
