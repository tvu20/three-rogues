import { useAppSelector } from "../../../utils/redux";
import useMediaQuery from "../../../utils/useMediaQuery";
import Loader from "../../shared/layout/Loader";
import CharacterActions from "./actions/CharacterActions";
import CharacterActionButtons from "./CharacterActionButtons";
import styles from "./CharacterOverview.module.css";
import CharacterCombat from "./combat/CharacterCombat";
import CharacterTrackedCompanions from "./companions/CharacterTrackedCompanions";
import CharacterSpellSlots from "./spellslots/CharacterSpellSlots";
import CharacterStats from "./stats/CharacterStats";
import CharacterTrackedFeatures from "./tracked/CharacterTrackedFeatures";

const CharacterOverview = () => {
  const bottomPadding = useMediaQuery(1050);
  const liveStats = useAppSelector((state) => state.character.liveStats);
  const creatures = useAppSelector((state) => state.character.creatures);

  const sortedCreatures = [...(creatures || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (!liveStats) {
    return <Loader />;
  }
  return (
    <div className="split-grid-container">
      <div className={styles.leftContainer}>
        <CharacterStats />
        <CharacterActions />
      </div>
      <div className={styles.rightContainer}>
        <CharacterActionButtons />
        <CharacterCombat />
        {liveStats.spellSlots && <CharacterSpellSlots />}
        <CharacterTrackedFeatures liveStats={liveStats} />
        <CharacterTrackedCompanions creatures={sortedCreatures || []} />
        {bottomPadding && <div className={styles.bottomPadding}></div>}
      </div>
    </div>
  );
};

export default CharacterOverview;
