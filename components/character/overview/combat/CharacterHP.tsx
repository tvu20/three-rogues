import { Character, LiveStats } from "../../../../app/character/characterDefs";
import styles from "./CharacterHP.module.css";

type CharacterHPProps = {
  character: Character;
  liveStats: LiveStats;
};

const CharacterHP = ({ character, liveStats }: CharacterHPProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.characterHP}>
        <div className={styles.hpContainer}>
          <h2>{liveStats.currentHP}</h2>
          <p>Hit Points</p>
        </div>
        <div className={`${styles.hpValue} ${styles.hpTemp}`}>
          <h6>TEMP</h6>
          <p>{liveStats.tempHP}</p>
        </div>
        <div className={styles.hpValue}>
          <h6>MAX</h6>
          <p>{character.maxHP}</p>
        </div>
      </div>
      <div className={styles.healDamageContainer}>
        <button className={`${styles.hpButton} ${styles.heal}`}>Heal</button>
        <input className={styles.hpInput} type="number" />
        <button className={`${styles.hpButton} ${styles.damage}`}>
          Damage
        </button>
      </div>
    </div>
  );
};

export default CharacterHP;
