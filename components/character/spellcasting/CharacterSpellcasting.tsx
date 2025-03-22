import { PencilSimple } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import { Spell } from "../../../app/character/characterDefs";
import {
  CLASS_SPELLCASTING_ABILITY,
  SPELL_TYPES,
} from "../../../app/character/characterMapping";
import { getAbilityModifier } from "../../../utils/characterUtils";
import useMediaQuery from "../../../utils/useMediaQuery";
import Search from "../../shared/inputs/Search";
import Tag from "../../shared/inputs/Tag";
import Loader from "../../shared/layout/Loader";
import styles from "./CharacterSpellcasting.module.css";
import CharacterSpells from "./CharacterSpells";

const CharacterSpellcasting = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const isMobile = useMediaQuery(950);

  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState<Spell[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (!character?.spells) return;

    let temp = [...character.spells];

    if (search !== "" || search.length > 0) {
      temp = temp.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.length > 0) {
      temp = temp.filter((r) => filters.includes(r.type));
    }
    setDisplayed(temp);
  }, [search, character?.spells, filters]);

  if (!character) {
    return <Loader />;
  }

  const addFilter = (item: string) => {
    setFilters((prevState) => [...prevState, item]);
  };

  const removeFilter = (item) => {
    setFilters((prevState) => prevState.filter((t) => t !== item));
  };

  const renderTags = () => {
    return SPELL_TYPES.map((t) => {
      return (
        <Tag key={t} name={t} addItem={addFilter} removeItem={removeFilter} />
      );
    });
  };

  const ModifySpellsButton = () => {
    return (
      <button className={`action-button ${styles.modifySpellsButton}`}>
        <PencilSimple size={24} />
        <p>Modify Spells</p>
      </button>
    );
  };

  const renderClassRows = () => {
    return character.class.map((c) => {
      if (!c.spellcasting) return null;

      const ability = CLASS_SPELLCASTING_ABILITY[c.name];
      const modifier = getAbilityModifier(character.abilityScores[ability]);
      const spellAttack = modifier + character.proficiencyBonus;
      const spellSave = 8 + modifier + character.proficiencyBonus;
      return (
        <div className={styles.classDetails} key={c.name}>
          <div key={c.name} className={styles.classModifier}>
            <h2>{CLASS_SPELLCASTING_ABILITY[c.name].toUpperCase()}</h2>
            <p>{c.name}</p>
          </div>
          <div className={styles.spellAttack}>
            <h3>Spell Attack</h3>
            <h2>+{spellAttack}</h2>
            <p>Bonus</p>
          </div>
          <div className={styles.spellSave}>
            <h3>Spell Save</h3>
            <h2>{spellSave}</h2>
            <p>DC</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className={styles.headingContainer}>
        {isMobile && ModifySpellsButton()}
        <div className={styles.leftContainer}>
          <Search
            search
            onChange={setSearch}
            value={search}
            placeholder="Search for a spell"
          />
          <h5>Apply filters</h5>
          <div className={styles.tagContainer}>{renderTags()}</div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerHeader}>
            <div>
              <p>
                <b>Focus: </b>
                {character.spellcastingFocus || "None"}
              </p>
              <p>
                <b>Max spells prepared: </b>
                {character.maxPrepared || "N/A"}
              </p>
            </div>
            {!isMobile && ModifySpellsButton()}
          </div>
          {renderClassRows()}
        </div>
      </div>
      <CharacterSpells spells={displayed} />
    </div>
  );
};

export default CharacterSpellcasting;
