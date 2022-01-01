import React from "react";
import ApiMocked from "../../api//api-mocked.json";
import { loadServerFXPairs } from "../../api/api";
import { AppContext } from "../../context/context";
import { FXPairInterface } from "./types";
import { filterFXByCodeAndName, validateFXPairs } from "./index";
import { FXPair } from "../FXPair";
import styles from "./FXPairsList.module.css";

export const FXPairsList = () => {
  const filterValue = React.useContext(AppContext).filterValue;
  const [fxPairs, setFxPairs] = React.useState<FXPairInterface[]>([]);
  const [fxPairsLoadingFinished, setFxPairsLoadingFinished] = React.useState<boolean>(false);
  const [filteredFxPairs, setFilteredFxPairs] = React.useState<FXPairInterface[]>([]);

  //Load initial FX data
  React.useEffect(() => {
    loadServerFXPairs()
      .then((data) => {
        setFxPairs(validateFXPairs(data.fx));
        setFxPairsLoadingFinished(true);
      })
      .catch(({ message }) => {
        console.log("Loading live FX data from the server failed. Using a local mockfile instead.");
        setFxPairs(validateFXPairs(ApiMocked.fx));
        setFxPairsLoadingFinished(true);
      });
  }, []);

  //Trigger filtering
  React.useEffect(() => {
    setFilteredFxPairs(filterFXByCodeAndName({ fxPairs, filterValue }));
  }, [fxPairs, filterValue]);

  if (!fxPairsLoadingFinished) {
    return <p className={styles.message}>Loading...</p>;
  }

  if (!filteredFxPairs.length) {
    return <p className={styles.message}>I'm sorry. I do not recognize the currency you are searching for.</p>;
  }

  return (
    <div className={styles.FXPairs}>
      {filteredFxPairs.map((fxPair) => (
        <FXPair currency={fxPair.currency} nameI18N={fxPair.nameI18N} exchangeRate={fxPair.exchangeRate} key={fxPair.currency} />
      ))}
    </div>
  );
};
