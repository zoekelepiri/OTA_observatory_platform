export interface ConfiscationsForPrefectureForMonths {
  formMonthDate: Date;
  toMonthDate: Date;
  confiscationsPerMonth: ConfiscationsForPrefecturePerMonth[];
}

export interface ConfiscationsForPrefecturePerMonth {
  monthDate: Date;
  totalConfiscations: number;
}
