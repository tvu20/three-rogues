import { useState } from "react";
import { Character, LiveStats } from "../../../../app/character/characterDefs";
import {
  setCurrentHP,
  setTempHP,
} from "../../../../app/character/characterSlice";
import { useAppDispatch } from "../../../../utils/redux";
import EditableCell from "../../../shared/EditableCell";
import styles from "./CharacterHP.module.css";

type CharacterHPProps = {
  character: Character;
  liveStats: LiveStats;
};

const CharacterHP = ({ character, liveStats }: CharacterHPProps) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);

  const handleHPChange = (value: number) => {
    dispatch(setCurrentHP(value));
  };

  const handleTempHPChange = (value: number) => {
    dispatch(setTempHP(value));
  };

  const handleHeal = () => {
    const newHP = Math.min(liveStats.currentHP + amount, character.maxHP);

    dispatch(setCurrentHP(newHP));
    setAmount(0);
  };

  const handleDamage = () => {
    let damage = amount;

    if (liveStats.tempHP > 0) {
      const tempDamage = Math.min(damage, liveStats.tempHP);
      damage -= tempDamage;
      dispatch(setTempHP(liveStats.tempHP - tempDamage));
    }

    const newHP = Math.max(liveStats.currentHP - damage, 0);
    dispatch(setCurrentHP(newHP));
    setAmount(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.characterHP}>
        <div className={styles.hpContainer}>
          <EditableCell value={liveStats.currentHP} onBlur={handleHPChange} />
          <p>Hit Points</p>
        </div>
        <div className={`${styles.hpValue} ${styles.hpTemp}`}>
          <h6>TEMP</h6>
          <EditableCell value={liveStats.tempHP} onBlur={handleTempHPChange} />
        </div>
        <div className={styles.hpValue}>
          <h6>MAX</h6>
          <p>{character.maxHP}</p>
        </div>
      </div>
      <div className={styles.healDamageContainer}>
        <button
          className={`${styles.hpButton} ${styles.heal}`}
          onClick={handleHeal}
        >
          Heal
        </button>
        <input
          className={styles.hpInput}
          type="number"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className={`${styles.hpButton} ${styles.damage}`}
          onClick={handleDamage}
        >
          Damage
        </button>
      </div>
    </div>
  );
};

export default CharacterHP;
