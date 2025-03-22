import { Sun, SunDim } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../../app/api/apiSlice";
import { SKILL_MAPPING } from "../../../../app/character/characterMapping";
import { setInspiration } from "../../../../app/character/characterSlice";
import { getAbilityModifier } from "../../../../utils/characterUtils";
import { useAppDispatch, useAppSelector } from "../../../../utils/redux";
import Loader from "../../../shared/layout/Loader";
import StatBlock from "../../shared/StatBlock";
import styles from "./CharacterStats.module.css";

const CharacterStats = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  const liveStats = useAppSelector((state) => state.character.liveStats);

  if (!liveStats) {
    return <Loader />;
  }

  const calculatePassive = (skillName: string) => {
    if (!character) {
      return "";
    }
    const passive = character.skills.find((skill) => skill.name === skillName);

    let bonus = getAbilityModifier(
      character?.abilityScores[SKILL_MAPPING[skillName]]
    );
    if (passive?.proficient) {
      bonus += character.proficiencyBonus;
    }
    if (passive?.expertise) {
      bonus += character.proficiencyBonus;
    }

    return 10 + bonus;
  };

  return (
    <div className={`content-box ${styles.container}`}>
      <div className={styles.topRow}>
        <div className={styles.statsContainer}>
          <div className={styles.proficiency}>
            <h5>Proficiency</h5>
            <h3>+{character?.proficiencyBonus}</h3>
            <p>Bonus</p>
          </div>
          <div className={styles.passive}>
            <div className={styles.passiveRow}>
              <h5>Passive Perception</h5>
              <p>{calculatePassive("Perception")}</p>
            </div>
            <div className={styles.passiveRow}>
              <h5>Passive Investigation</h5>
              <p>{calculatePassive("Investigation")}</p>
            </div>
            <div className={styles.passiveRow}>
              <h5>Passive Insight</h5>
              <p>{calculatePassive("Insight")}</p>
            </div>
          </div>
        </div>
        <div className={styles.darkvision}>
          <h5>Darkvision</h5>
          {character?.darkvision && (
            <h3>
              {character?.darkvision}
              <span> ft</span>
            </h3>
          )}
          {!character?.darkvision && <p>None</p>}
        </div>
        <div className={styles.inspiration}>
          <h5>Inspiration</h5>
          <button
            onClick={() => dispatch(setInspiration(!liveStats?.inspiration))}
          >
            {liveStats?.inspiration ? (
              <Sun className={styles.inspirationIcon} size={38} />
            ) : (
              <SunDim className={styles.inspirationIconDim} size={38} />
            )}
          </button>
        </div>
      </div>
      <StatBlock
        abilityScores={character?.abilityScores || null}
        savingThrows={character?.savingThrows || null}
        proficiencyBonus={character?.proficiencyBonus ?? 0}
      />
    </div>
  );
};

export default CharacterStats;
