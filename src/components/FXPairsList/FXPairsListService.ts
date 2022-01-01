import { FilterPairsInputInterface } from "./types";

export const filterFXByCodeAndName = ({ fxPairs, filterValue }: FilterPairsInputInterface) => {
  const trimmedFilterValue = filterValue.replace(/\s+/g, "").toLowerCase();
  return fxPairs.filter((fxPair) => {
    const currencyCode = fxPair.currency.toLowerCase();
    const currencyNameIndividualWords = fxPair.nameI18N.toLowerCase().split(" ");
    const currencyName = fxPair.nameI18N.replace(/\s+/g, "").toLowerCase();
    return currencyCode.startsWith(trimmedFilterValue) || currencyNameIndividualWords.some((word: string) => word.startsWith(trimmedFilterValue)) || currencyName.startsWith(trimmedFilterValue);
  });
};

export const validateFXPairs = (fxPairs: any) => {
  return fxPairs.filter((pair: any) => pair.currency.replace(/\s+/g, "").length === 3 && pair.nameI18N !== undefined && pair.exchangeRate !== undefined && pair.exchangeRate.middle);
};
