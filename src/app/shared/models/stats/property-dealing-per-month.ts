export interface PropertyDealingPerMonth {

  monthDate: Date;
  propertyDealingByPrefecture: PropertyDealingByPrefecture[];

}

export interface PropertyDealingByPrefecture {
  prefectureId: number;
  prefectureName: string;
  totalPropertyDealing: number;
}
