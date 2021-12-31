import React from "react";
import { AppContext } from "../../context/context";
import { handleLoadServerFXPairs } from "../../actions/fxPairs";
import { filterFXByCodeAndName } from "./index";
import { FXPair } from "../FXPair";
import classes from "./FXPairsList.module.css";

export const FXPairsList = () => {
  const context = React.useContext(AppContext);
  const fxPairs = useSelector((state) => state.fxPairs.data);
  const fxPairsLoaded = useSelector((state) => state.fxPairs.fxPairsLoaded);
  const [filteredFxPairs, setFilteredFxPairs] = React.useState([]);

  React.useEffect(() => {
    dispatch(handleLoadServerFXPairs());
  }, [dispatch]);

  React.useEffect(() => {
    setFilteredFxPairs(filterFXByCodeAndName({ fxPairs, filterValue }));
  }, [context.filterValue, fxPairs]);

  if (!fxPairsLoaded) {
    return <p>Loading...</p>;
  }

  if (!filteredFxPairs.length) {
    return <p>I'm sorry. I do not recognize the currency you are searching for.</p>;
  }

  return (
    <div className={classes.FXPairs}>
      {filteredFxPairs.map((fxPair) => (
        <FXPair fxPairData={fxPair} currencyCode={fxPair.currency} key={fxPair.currency} />
      ))}
    </div>
  );
};
