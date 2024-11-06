export interface AreaForPrefectureForMonths {
  formMonthDate: Date;
  toMonthDate: Date;
  areaPerMonth: AreaForPrefecturePerMonth[];
}

export interface AreaForPrefecturePerMonth {
  monthDate: Date;
  totalAreas: number;
}
