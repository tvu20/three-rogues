import { Currency } from "../../../app/character/characterDefs";
import {
  CURRENCY_COLOR_MAP,
  CURRENCY_MAP,
} from "../../../app/character/characterMapping";

import styles from "./CharacterInventory.module.css";

const CharacterCurrency = ({ currency }: { currency: Currency }) => {
  const createCurrencies = () => {
    return Object.entries(currency).map(([key, value]) => {
      return (
        <div key={key} className={styles.currency}>
          <div
            className={styles.dot}
            style={{ backgroundColor: CURRENCY_COLOR_MAP[key] }}
          />
          <h4 className={styles.currencyName}>{CURRENCY_MAP[key]}</h4>
          <p className={styles.currencyValue}>{value}</p>
        </div>
      );
    });
  };

  return (
    <div className={`content-box ${styles.currencyContainer}`}>
      <h2 className="small-section-header">Currency</h2>
      {createCurrencies()}
    </div>
  );
};

export default CharacterCurrency;
