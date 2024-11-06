export interface MortgagesPerMonth {

  monthDate: Date;
  mortgagesByPrefecture: MortgagesByPrefecture[];

}

export interface MortgagesByPrefecture {
  prefectureId: number;
  prefectureName: string;
  totalMortgages: number;
}
