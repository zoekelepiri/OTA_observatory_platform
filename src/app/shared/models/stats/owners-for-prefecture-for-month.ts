export interface OwnersForPrefectureForMonths {
  formMonthDate: Date;
  toMonthDate: Date;
  ownersPerMonth: OwnersForPrefecturePerMonth[];
}

export interface OwnersForPrefecturePerMonth {
  monthDate: Date;
  totalOwners: number;
}
