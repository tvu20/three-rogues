import { DeathSaves } from "../../../../app/character/characterDefs";
import { setDeathSaves } from "../../../../app/character/characterSlice";
import { useAppDispatch } from "../../../../utils/redux";
import styles from "./CharacterHP.module.css";

type CharacterDeathSavesProps = {
  saves: DeathSaves;
};

const CharacterDeathSaves = ({ saves }: CharacterDeathSavesProps) => {
  //   saves = { successes: 1, failures: 2 };

  const dispatch = useAppDispatch();

  const handleSaveSuccessClick = (index: number) => {
    dispatch(setDeathSaves({ ...saves, successes: index }));
  };

  const handleSaveFailureClick = (index: number) => {
    dispatch(setDeathSaves({ ...saves, failures: index }));
  };

  const createSuccesses = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <button
        className={`${styles.saveButton} ${styles.success} ${
          saves.successes >= index + 1 ? styles.active : ""
        }`}
        onClick={() => handleSaveSuccessClick(index + 1)}
      ></button>
    ));
  };

  const createFailures = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <button
        className={`${styles.saveButton} ${styles.failure} ${
          saves.failures >= index + 1 ? styles.active : ""
        }`}
        onClick={() => handleSaveFailureClick(index + 1)}
      ></button>
    ));
  };

  return (
    <div className={styles.deathSavesContainer}>
      <h3>Death Saves</h3>
      <div className={styles.deathSavesRow}>{createSuccesses()}</div>
      <div className={styles.deathSavesRow}>{createFailures()}</div>
      <button
        className={`action-button ${styles.resetButton}`}
        onClick={() => dispatch(setDeathSaves({ successes: 0, failures: 0 }))}
      >
        Reset
      </button>
    </div>
  );
};

export default CharacterDeathSaves;
