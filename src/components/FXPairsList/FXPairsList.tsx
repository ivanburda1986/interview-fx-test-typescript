import React from "react";
import ApiMocked from "../../api//api-mocked.json";
import { loadServerFXPairs } from "../../api/api";
import { AppContext } from "../../context/context";
import { FXPairInterface } from "./types";
import { filterFXByCodeAndName, validateFXPairs } from "./index";
import { FXPair } from "../FXPair";
import classes from "./FXPairsList.module.css";

export const FXPairsList = () => {
  const filterValue = React.useContext(AppContext).filterValue;
  const [fxPairs, setFxPairs] = React.useState<FXPairInterface[]>([]);
  const [fxPairsLoadingFinished, setFxPairsLoadingFinished] = React.useState<boolean>(false);
  const [filteredFxPairs, setFilteredFxPairs] = React.useState<FXPairInterface[]>([]);

  React.useEffect(() => {
    loadServerFXPairs()
      .then((data) => {
        let validated = validateFXPairs(data.fx);
        setFxPairs(validated);
        setFxPairsLoadingFinished(true);
      })
      .catch(({ message }) => {
        console.log("Loading live FX data from the server failed. Using a local mockfile instead.");
        setFxPairs(validateFXPairs(ApiMocked.fx));
        setFxPairsLoadingFinished(true);
      });
  }, []);

  React.useEffect(() => {
    const filteringResult = filterFXByCodeAndName({ fxPairs, filterValue });
    let streamlined = filteringResult.map((piece: any) => ({ name: piece.nameI18N, currency: piece.currency, exchangeRate: piece.exchangeRate.middle }));
    setFilteredFxPairs(filteringResult);
  }, [fxPairs, filterValue]);

  if (!fxPairsLoadingFinished) {
    return <p>Loading...</p>;
  }

  if (!filteredFxPairs.length) {
    return <p>I'm sorry. I do not recognize the currency you are searching for.</p>;
  }

  return (
    <div className={classes.FXPairs}>
      {filteredFxPairs.map((fxPair) => (
        <FXPair currency={fxPair.currency} nameI18N={fxPair.nameI18N} exchangeRate={fxPair.exchangeRate} key={fxPair.currency} />
      ))}
    </div>
  );
};
