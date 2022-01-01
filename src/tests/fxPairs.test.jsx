import { validateFXPairs } from "../fxPairs";
import { filterFXByCodeAndName } from "../../components/FXPairsList/index";
import validFXPairsMocked from "./fxPairs-validated-mock.json";
import FX from "./fxPairs-validated-named";

describe("Takes foreign-currency-rate pairs and returns only those which are valid for the purpose of the app", () => {
  test("Excludes currencies with a code that does not have 3 characters", () => {
    expect(validateFXPairs([INVALID_CODE1, INVALID_CODE2, INVALID_CODE3, INVALID_CODE4, VALID])).toEqual([VALID]);
  });
  test("Excludes currencies with a missing name", () => {
    expect(validateFXPairs([MISSING_NAME, VALID])).toEqual([VALID]);
  });
  test("Excludes currencies with missing exchange rates", () => {
    expect(validateFXPairs([MISSING_EXCHANGE_RATES, VALID])).toEqual([VALID]);
  });
  test("Excludes currencies with a missing middle rate", () => {
    expect(validateFXPairs([MISSING_MIDDLE_RATE, VALID])).toEqual([VALID]);
  });
});

describe("Real-time currency search returns currencies matching the search criteria", () => {
  test("Entering a single letter returns all currencies with the currency code or any word of the currency name starting by the letter", () => {
    expect(filterFXByCodeAndName({ fxPairs: validFXPairsMocked, filterValue: "e" })).toEqual([FX.ETB, FX.EUR, FX.XCD, FX.EGP]);
  });
  test("Entering 2 letters returns all currencies with the currency code or any word of the currency name starting by the 2 letters", () => {
    expect(filterFXByCodeAndName({ fxPairs: validFXPairsMocked, filterValue: "kr" })).toEqual([FX.SEK, FX.ISK, FX.DKK, FX.NOK, FX.KRW]);
  });
  test("Entering 3 letters returns all currencies with the currency code matching the letters or any word of the currency name starting by the 3 letters", () => {
    expect(filterFXByCodeAndName({ fxPairs: validFXPairsMocked, filterValue: "cad" })).toEqual([FX.CAD]);
  });
  test("Entering a set of letters returns all currencies with the currency code matching the letters or any word of the currency name starting by the letters", () => {
    expect(filterFXByCodeAndName({ fxPairs: validFXPairsMocked, filterValue: "kRo" })).toEqual([FX.SEK, FX.ISK, FX.DKK, FX.NOK]);
  });
  test("Search by currency name is case-insensitive", () => {
    expect(filterFXByCodeAndName({ fxPairs: validFXPairsMocked, filterValue: "pOuNd" })).toEqual([FX.LBP, FX.SYP, FX.GBP, FX.EGP]);
  });
  test("Search by currency code is case-insensitive", () => {
    expect(filterFXByCodeAndName({ fxPairs: validFXPairsMocked, filterValue: "cZk" })).toEqual([FX.CZK]);
  });
  test("Search ignores any spacing", () => {
    expect(filterFXByCodeAndName({ fxPairs: validFXPairsMocked, filterValue: "mExIcA n Pe   SO" })).toEqual([FX.MXN]);
  });
});

//TEST DATA
//Invalid currency code
const INVALID_CODE1 = {
  currency: "   ",
  nameI18N: "Middle Earth Dollar",
  exchangeRate: { buy: 25.575, middle: 25.925, sell: 26.275, indicator: 0, lastModified: "2018-11-08T23:00:00Z" },
};
const INVALID_CODE2 = {
  currency: "ME",
  nameI18N: "Middle Earth Dollar",
  exchangeRate: { buy: 25.575, middle: 25.925, sell: 26.275, indicator: 0, lastModified: "2018-11-08T23:00:00Z" },
};
const INVALID_CODE3 = {
  currency: "MEDL",
  nameI18N: "Middle Earth Dollar",
  exchangeRate: { buy: 25.575, middle: 25.925, sell: 26.275, indicator: 0, lastModified: "2018-11-08T23:00:00Z" },
};
const INVALID_CODE4 = {
  currency: "",
  nameI18N: "Middle Earth Dollar",
  exchangeRate: { buy: 25.575, middle: 25.925, sell: 26.275, indicator: 0, lastModified: "2018-11-08T23:00:00Z" },
};

//Missing name
const MISSING_NAME = {
  currency: "MED",
  exchangeRate: { buy: 25.575, middle: 25.925, sell: 26.275, indicator: 0, lastModified: "2018-11-08T23:00:00Z" },
};

//Missing exchange rates
const MISSING_EXCHANGE_RATES = {
  currency: "MED",
  nameI18N: "Middle Earth Dollar",
};

//With missing exchange rate middle
const MISSING_MIDDLE_RATE = {
  currency: "MED",
  nameI18N: "Middle Earth Dollar",
  exchangeRate: { buy: 25.575, sell: 26.275, indicator: 0, lastModified: "2018-11-08T23:00:00Z" },
};

//Valid currency
const VALID = {
  currency: "CZK",
  nameI18N: "Czech Koruna",
  exchangeRate: { buy: 25.575, middle: 25.925, sell: 26.275, indicator: 0, lastModified: "2018-11-08T23:00:00Z" },
};
