import {
  AbilityScores,
  SavingThrows,
  STATS,
} from "../../../app/character/characterDefs";
import styles from "./StatBlock.module.css";

type StatProps = {
  name: string;
  stat: number;
  bonus: number;
  savingThrowProficiency: boolean;
  savingThrowBonus: number;
};

type StatBlockProps = {
  abilityScores: AbilityScores | null;
  savingThrows: SavingThrows | null;
  proficiencyBonus: number;
};

const Stat = ({
  name,
  stat,
  bonus,
  savingThrowProficiency,
  savingThrowBonus,
}: StatProps) => {
  return (
    <div className={styles.statItem}>
      <div className={styles.statValue}>{stat}</div>
      <div className={styles.statBonus}>
        <h2>{bonus > 0 ? "+" + bonus : bonus}</h2>
        <p>{name}</p>
      </div>
      <div className={styles.saveStat}>
        <div
          className={`${styles.saveProf} ${
            savingThrowProficiency ? styles.active : ""
          }`}
        />
        <h5>SAVE</h5>
        <p>
          {savingThrowBonus > 0 ? "+" + savingThrowBonus : savingThrowBonus}
        </p>
      </div>
    </div>
    // <div>
    //   {name}: {stat}, {bonus}
    //   Proficient: {savingThrowProficiency ? "Yes" : "No"}
    //   Bonus: {savingThrowBonus}
    // </div>
  );
};

const StatBlock = ({
  abilityScores,
  savingThrows,
  proficiencyBonus,
}: StatBlockProps) => {
  if (!abilityScores || !savingThrows) {
    return null;
  }

  const createStats = () => {
    return STATS.map((stat) => {
      const score = abilityScores[stat];
      const bonus = Math.floor((score - 10) / 2);

      const savingThrow = savingThrows[stat];
      const savingThrowProficiency = savingThrow.proficiency;

      const savingThrowBonus = savingThrowProficiency
        ? proficiencyBonus + savingThrow.bonus + bonus
        : savingThrow.bonus + bonus;

      return (
        <Stat
          key={stat}
          name={stat}
          stat={score}
          bonus={bonus}
          savingThrowProficiency={savingThrowProficiency}
          savingThrowBonus={savingThrowBonus}
        />
      );
    });
  };
  return <div className={styles.statBlock}>{createStats()}</div>;
};

export default StatBlock;
