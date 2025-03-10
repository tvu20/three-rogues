import { AC, Character } from "../../../../app/character/characterDefs";

import styles from "./CharacterCombat.module.css";

type CharacterCombatStatsProps = {
  character: Character;
};

const CharacterCombatStats = ({ character }: CharacterCombatStatsProps) => {
  const calculateAC = (acObject: AC) => {
    return acObject.armor + acObject.shield + acObject.bonus;
  };

  return (
    <div className={styles.topRow}>
      <div className={`${styles.displayValue} ${styles.ac}`}>
        <h5>AC</h5>
        <h3>{character?.ac ? calculateAC(character.ac) : 0}</h3>
      </div>
      <div className={`${styles.displayValue} ${styles.initiative}`}>
        <h5>Initiative</h5>
        <h3>+{character?.initiative ?? 0}</h3>
      </div>
      <div className={styles.speedContainer}>
        <div className={`${styles.displayValue} ${styles.speed}`}>
          <h5>Speed</h5>
          <h3>
            {character?.speed.walk}
            <span> ft</span>
          </h3>
        </div>
        <div className={styles.otherSpeedsContainer}>
          <div>
            <h4>Fly</h4>
            <p>{character?.speed.fly ? `${character?.speed.fly}ft` : "None"}</p>
          </div>
          <div>
            <h4>Swim</h4>
            <p>
              {character?.speed.swim ? `${character?.speed.swim}ft` : "None"}
            </p>
          </div>
          <div>
            <h4>Climb</h4>
            <p>
              {character?.speed.climb ? `${character?.speed.climb}ft` : "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCombatStats;
