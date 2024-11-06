export interface PropertiesForPrefectureForMonths {
  formMonthDate: Date;
  toMonthDate: Date;
  propertiesPerMonth: PropertiesForPrefecturePerMonth[];
}

export interface PropertiesForPrefecturePerMonth {
  monthDate: Date;
  totalProperties: number;
}
