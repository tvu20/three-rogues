import { useAppSelector } from "../../../utils/redux";
import Loader from "../../shared/Loader";
import CharacterActionButtons from "./CharacterActionButtons";
import styles from "./CharacterOverview.module.css";
import CharacterCombat from "./combat/CharacterCombat";
import CharacterSpellSlots from "./spellslots/CharacterSpellSlots";
import CharacterStats from "./stats/CharacterStats";
import CharacterTrackedFeatures from "./tracked/CharacterTrackedFeatures";

const CharacterOverview = () => {
  const liveStats = useAppSelector((state) => state.character.liveStats);

  if (!liveStats) {
    return <Loader />;
  }
  return (
    <div className="split-grid-container">
      <div className={styles.leftContainer}>
        <CharacterStats />
        <div className={styles.item2} style={{ height: "1500px" }}>
          item two
        </div>
      </div>
      <div className={styles.rightContainer}>
        <CharacterActionButtons />
        <CharacterCombat />
        {liveStats.spellSlots && <CharacterSpellSlots />}
        <CharacterTrackedFeatures liveStats={liveStats} />
      </div>
    </div>
  );
};

export default CharacterOverview;
