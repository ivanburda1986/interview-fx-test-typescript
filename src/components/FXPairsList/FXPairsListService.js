export const filterFXByCodeAndName = ({ fxPairs, filterValue }) => {
  const trimmedFilterValue = filterValue.replace(/\s+/g, "");
  return fxPairs.filter((fxPair) => {
    const currencyCode = fxPair.currency.toLowerCase();
    const currencyNameIndividualWords = fxPair.nameI18N
      .toLowerCase()
      .split(" ");
    const currencyName = fxPair.nameI18N.replace(/\s+/g, "").toLowerCase();
    return (
      currencyCode.startsWith(trimmedFilterValue) ||
      currencyNameIndividualWords.some((word) =>
        word.startsWith(trimmedFilterValue)
      ) ||
      currencyName.startsWith(trimmedFilterValue)
    );
  });
};
