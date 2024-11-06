export interface PropertyDealingForPrefectureForMonths {
  formMonthDate: Date;
  toMonthDate: Date;
  propertyDealingPerMonth: PropertyDealingForPrefecturePerMonth[];
}

export interface PropertyDealingForPrefecturePerMonth {
  monthDate: Date;
  totalPropertyDealings: number;
}
