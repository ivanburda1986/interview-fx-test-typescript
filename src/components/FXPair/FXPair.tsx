import React from "react";
import { FXPairInterface } from "../FXPairsList/types";
import placeholderFlag from "../../flags/placeholderFlag.png";
import styles from "./FXPair.module.css";

export const FXPair: React.FC<FXPairInterface> = (props) => {
  const [flagImgSrc, setFlagImgSrc] = React.useState("");
  const [imgAlt, setImgAlt] = React.useState("");
  const { currency, nameI18N, exchangeRate } = props;

  React.useEffect(() => {
    (async function fetchImg() {
      await import(`../../flags/${currency.slice(0, 2).toLowerCase()}.png`)
        .then((image) => {
          setImgAlt(`Flag of the country with the currency: ${currency}`);
          setFlagImgSrc(image.default);
        })
        .catch(() => {
          setImgAlt(`A placeholder image - a flag for this currency is unavailable.`);
          setFlagImgSrc(placeholderFlag);
        });
    })();
  }, [props]);

  return (
    <div className={styles.FXPair}>
      <img src={flagImgSrc} alt={imgAlt} />
      <p className={styles.CurrencyCode}>{currency}</p>
      <p className={styles.CurrencyName}>{nameI18N}</p>
      <p className={styles.fXRate}>{exchangeRate.middle} / € </p>
    </div>
  );
};
