export interface MortgagesForPrefectureForMonths {
  formMonthDate: Date;
  toMonthDate: Date;
  mortgagesPerMonth: MortgagesForPrefecturePerMonth[];
}

export interface MortgagesForPrefecturePerMonth {
  monthDate: Date;
  totalMortgages: number;
}
