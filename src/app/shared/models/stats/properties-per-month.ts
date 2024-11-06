export interface PropertiesPerMonth {

  monthDate: Date;
  propertiesByPrefecture: PropertiesByPrefecture[];

}

export interface PropertiesByPrefecture {
  prefectureId: number;
  prefectureName: string;
  totalProperties: number;
}
