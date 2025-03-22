import { Spell } from "../../../app/character/characterDefs";
import styles from "./CharacterSpellcasting.module.css";
import SpellBlock from "./SpellBlock";
type CharacterSpellsProps = {
  spells: Spell[];
};

const CharacterSpells = ({ spells }: CharacterSpellsProps) => {
  return (
    <div className={styles.spellsContainer}>
      {spells.map((spell) => (
        <SpellBlock key={spell.id} spell={spell} />
      ))}
    </div>
  );
};

export default CharacterSpells;
