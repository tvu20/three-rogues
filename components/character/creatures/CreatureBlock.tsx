import { Creature } from "../../../app/character/characterDefs";
import useMediaQuery from "../../../utils/useMediaQuery";
import StatBlock from "../shared/StatBlock";
import styles from "./CharacterCreatures.module.css";

type CreatureBlockProps = {
  creature: Creature;
};

const CreatureBlock = ({ creature }: CreatureBlockProps) => {
  const isBreakpoint = useMediaQuery(1050);

  const renderFeatures = (
    features: {
      name: string;
      description: string;
    }[]
  ) => {
    return features.map((feature) => (
      <div key={feature.name} className={styles.feature}>
        <h4>{feature.name}</h4>
        <h5>{feature.description}</h5>
      </div>
    ));
  };

  const renderStatblock = () => {
    return (
      <StatBlock
        abilityScores={creature?.abilityScores || null}
        savingThrows={null}
        proficiencyBonus={creature?.proficiencyBonus ?? 0}
        hideSaves
      />
    );
  };

  return (
    <div className={`split-grid-container ${styles.creatureBlockContainer}`}>
      <div className={styles.creatureBlockContainer}>
        {!isBreakpoint && renderStatblock()}
        <h3 className="small-section-header">Features</h3>
        {renderFeatures(creature?.features || [])}
        <h3 className="small-section-header">Combat</h3>
        {renderFeatures(creature?.combat || [])}
      </div>
      <div className={styles.rightContainer}>
        {isBreakpoint && renderStatblock()}
        <div className={styles.passiveContainer}>
          <div className={styles.passiveRow}>
            <h5>Proficiency Bonus</h5>
            <p>
              {creature?.proficiencyBonus > 0
                ? `+${creature?.proficiencyBonus}`
                : creature?.proficiencyBonus}
            </p>
          </div>
          <div className={styles.passiveRow}>
            <h5>Passive Perception</h5>
            <p>{creature?.passivePerception}</p>
          </div>
        </div>
        <div className={styles.skillsContainer}>
          <div className="spacer" />
          <h5>Saving Throws</h5>
          <h6>{creature?.savingThrows}</h6>
          <div className="spacer" />
          <h5>Skills</h5>
          <h6>{creature?.skills}</h6>
          <div className="spacer" />
          <h5>Senses</h5>
          <h6>{creature?.senses}</h6>
          <div className="spacer" />
          <h5>Languages</h5>
          <h6>{creature?.languages}</h6>
        </div>
      </div>
    </div>
  );
};

export default CreatureBlock;
