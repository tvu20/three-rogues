import CharacterActionButtons from "./CharacterActionButtons";
import styles from "./CharacterOverview.module.css";
import CharacterCombat from "./combat/CharacterCombat";
import CharacterStats from "./stats/CharacterStats";
const CharacterOverview = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <CharacterStats />
        <div className={styles.item2} style={{ height: "200px" }}>
          item two
        </div>
      </div>
      <div className={styles.rightContainer}>
        <CharacterActionButtons />
        <CharacterCombat />
        <div className={styles.item2} style={{ height: "600px" }}>
          item four
        </div>
      </div>
    </div>
  );
};

export default CharacterOverview;
