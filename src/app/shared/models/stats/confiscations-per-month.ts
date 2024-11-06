export interface ConfiscationsPerMonth {

  monthDate: Date;
  confiscationsByPrefecture: ConfiscationsByPrefecture[];

}

export interface ConfiscationsByPrefecture {
  prefectureId: number;
  prefectureName: string;
  totalConfiscations: number;
}
