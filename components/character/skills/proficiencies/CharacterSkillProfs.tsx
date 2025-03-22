import { AbilityScores, Skill } from "../../../../app/character/characterDefs";
import { SKILL_MAPPING } from "../../../../app/character/characterMapping";
import { getAbilityModifier } from "../../../../utils/characterUtils";
import styles from "./CharacterSkillProfs.module.css";

type CharacterSkillProfsProps = {
  skills: Skill[];
  abilityScores: AbilityScores;
  proficiencyBonus: number;
};

const CharacterSkillProfs = ({
  skills,
  abilityScores,
  proficiencyBonus,
}: CharacterSkillProfsProps) => {
  // sort skills by alphabetical order of name
  const sortedSkills = [...skills].sort((a, b) => a.name.localeCompare(b.name));

  const createSkillRow = (skill: Skill) => {
    let bonus = getAbilityModifier(abilityScores[SKILL_MAPPING[skill.name]]);

    if (skill.proficient) {
      bonus += proficiencyBonus;
    }

    if (skill.expertise) {
      bonus += proficiencyBonus;
    }

    return (
      <div className={styles.skillRow}>
        <div className={styles.firstColumn}>
          <div className={styles.proficiencyIcons}>
            <div
              className={`${styles.prof} ${
                skill.proficient ? styles.active : ""
              }`}
            />
            <div
              className={`${styles.prof} ${
                skill.expertise ? styles.active : ""
              }`}
            />
          </div>
          <div className={styles.skillName}>
            <p>{SKILL_MAPPING[skill.name]}</p>
          </div>
        </div>
        <div className={styles.secondColumn}>
          <div className={styles.skillBonus}>
            <p>{bonus >= 0 ? "+" + bonus : bonus}</p>
          </div>
          <div className={styles.name}>
            <p>{skill.name}</p>
          </div>
        </div>
        <div className={styles.source}>
          <p>{skill.source}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`content-box ${styles.container}`}>
      <h2 className="small-section-header">Skills</h2>
      {sortedSkills.map(createSkillRow)}
    </div>
  );
};

export default CharacterSkillProfs;
