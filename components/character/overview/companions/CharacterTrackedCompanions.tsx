import { Creature } from "../../../../app/character/characterDefs";
import { setCreatureHP } from "../../../../app/character/characterSlice";
import { useAppDispatch } from "../../../../utils/redux";
import EditableCell from "../../../shared/inputs/EditableCell";
import styles from "./CharacterTrackedCompanions.module.css";

type CharacterTrackedCompanionsProps = {
  creatures: Creature[];
};

const CharacterTrackedCompanions = ({
  creatures,
}: CharacterTrackedCompanionsProps) => {
  const dispatch = useAppDispatch();

  if (creatures.length === 0) {
    return null;
  }

  const handleHPChange = (value: number, id: string) => {
    dispatch(setCreatureHP({ id, hp: value }));
  };

  const createItems = () => {
    if (!Array.isArray(creatures)) return null;

    return creatures.map((creature) => {
      return (
        <div key={creature.id} className={styles.creatureRow}>
          <p>{creature?.name || "Unknown"}</p>
          <div className={styles.hpContainer}>
            <EditableCell
              value={creature?.currentHP ?? 0}
              onBlur={(value) => handleHPChange(value, creature?.id ?? "")}
            />
            <p> / {creature?.maxHP || 0}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="content-box">
      <h2 className={`${styles.sectionHeader} small-section-header`}>
        Creatures
      </h2>
      {createItems()}
    </div>
  );
};

export default CharacterTrackedCompanions;
