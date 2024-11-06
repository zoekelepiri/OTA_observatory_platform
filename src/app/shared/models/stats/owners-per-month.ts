export interface OwnersPerMonth {

  monthDate: Date;
  ownersByPrefecture: OwnersByPrefecture[];

}

export interface OwnersByPrefecture {
  prefectureId: number;
  prefectureName: string;
  totalOwners: number;
}
