import { Spell } from "../../../app/character/characterDefs";
import styles from "./SpellBlock.module.css";

type SpellBlockProps = {
  spell: Spell;
};

const SpellBlock = ({ spell }: SpellBlockProps) => {
  return (
    <div className={`${styles.spellBlock} content-box`}>
      <div>
        <div className={styles.spellHeader}>
          <div className={styles.spellHeaderText}>
            <h2>{spell.name} </h2>
            <h3>
              {spell.level === "cantrip"
                ? `${spell.school} cantrip`
                : `Level ${spell.level} ${spell.school}`}
            </h3>
          </div>
          <p>{spell.components}</p>
        </div>
        <div className={styles.spellData}>
          <div className={styles.spellDataRow}>
            <h5>Casting Time</h5>
            <p>{spell.castingTime}</p>
          </div>
          <div className={styles.spellDataRow}>
            <h5>Ritual</h5>
            <p className={spell.ritual ? styles.positive : styles.negative}>
              {spell.ritual ? "Y" : "N"}
            </p>
          </div>
          <div className={styles.spellDataRow}>
            <h5>Range</h5>
            <p>{spell.range}</p>
          </div>
          <div className={styles.spellDataRow}>
            <h5>Concentration</h5>
            <p
              className={
                spell.concentration ? styles.positive : styles.negative
              }
            >
              {spell.concentration ? "Y" : "N"}
            </p>
          </div>
          <div className={styles.spellDataRow}>
            <h5>Duration</h5>
            <p>{spell.duration}</p>
          </div>
          <div className={styles.spellDataRow}>
            <h5>Prepared</h5>
            {spell.prepared !== undefined && spell.prepared !== null && (
              <p className={spell.prepared ? styles.positive : styles.negative}>
                {spell.prepared ? "Y" : "N"}
              </p>
            )}
          </div>
        </div>
        <div className={styles.spellDescription}>
          {spell.damage ? (
            <p>
              <b>Damage:</b> {spell.damage}
            </p>
          ) : null}
          {spell.save ? (
            <p>
              <b>Save:</b> {spell.save.toUpperCase()}
            </p>
          ) : null}
          {spell.description ? <p>{spell.description}</p> : null}
        </div>
      </div>
      <div className={styles.spellFooter}>
        <p>Source: {spell.source}</p>
        <div className="action-button">{spell.type}</div>
      </div>
    </div>
  );
};

export default SpellBlock;
