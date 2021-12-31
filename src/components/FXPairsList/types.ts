export interface FXPairInterface {
  currency: string;
  nameI18N: string;
  exchangeRate: { middle: number };
}

export interface FilterPairsInputInterface {
  fxPairs: FXPairInterface[];
  filterValue: string;
}
