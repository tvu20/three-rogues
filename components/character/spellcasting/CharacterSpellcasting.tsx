import { PencilSimple } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import { Spell } from "../../../app/character/characterDefs";
import {
  CLASS_SPELLCASTING_ABILITY,
  SPELL_TYPES,
} from "../../../app/character/characterMapping";
import { getAbilityModifier } from "../../../utils/characterUtils";
import { useAppSelector } from "../../../utils/redux";
import useMediaQuery from "../../../utils/useMediaQuery";
import Search from "../../shared/inputs/Search";
import Tag from "../../shared/inputs/Tag";
import Loader from "../../shared/layout/Loader";
import styles from "./CharacterSpellcasting.module.css";
import CharacterSpells from "./CharacterSpells";

const CharacterSpellcasting = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const router = useRouter();

  const isMobile = useMediaQuery(950);

  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState<Spell[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [levelFilters, setLevelFilters] = useState<string[]>([]);
  const [preparedOnly, setPreparedOnly] = useState(false);
  const [concentrationOnly, setConcentrationOnly] = useState(false);
  const [ritualOnly, setRitualOnly] = useState(false);
  const isOwner = useAppSelector((state) => state.character.isOwner);

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  // Helper function to sort spells by level
  const sortSpellsByLevel = (spells: Spell[]) => {
    return [...spells].sort((a, b) => {
      const levelA = a.level === "cantrip" ? 0 : parseInt(a.level);
      const levelB = b.level === "cantrip" ? 0 : parseInt(b.level);
      return levelA - levelB;
    });
  };

  useEffect(() => {
    if (!Array.isArray(character?.spells)) {
      setDisplayed([]);
      return;
    }

    let temp = [...character.spells];

    // Filter by search
    if (search !== "" || search.length > 0) {
      temp = temp.filter((r) =>
        r?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by spell type (damage, buff, debuff, etc.)
    if (filters.length > 0) {
      temp = temp.filter((r) => filters.includes(r.type));
    }

    // Filter by spell level
    if (levelFilters.length > 0) {
      temp = temp.filter((r) => levelFilters.includes(r.level));
    }

    // Filter by prepared status (always include cantrips)
    if (preparedOnly) {
      temp = temp.filter(
        (r) =>
          r.level === "cantrip" ||
          r.prepared === true ||
          r.prepared === "true"
      );
    }

    // Filter by concentration
    if (concentrationOnly) {
      temp = temp.filter((r) => r.concentration === true);
    }

    // Filter by ritual
    if (ritualOnly) {
      temp = temp.filter((r) => r.ritual === true);
    }

    // Sort by level (cantrips first, then 1-9)
    temp = sortSpellsByLevel(temp);

    setDisplayed(temp);
  }, [search, character?.spells, filters, levelFilters, preparedOnly, concentrationOnly, ritualOnly]);

  if (!character) {
    return <Loader />;
  }

  const addFilter = (item: string) => {
    setFilters((prevState) => [...prevState, item]);
  };

  const removeFilter = (item: string) => {
    setFilters((prevState) => prevState.filter((t) => t !== item));
  };

  const addLevelFilter = (item: string) => {
    setLevelFilters((prevState) => [...prevState, item]);
  };

  const removeLevelFilter = (item: string) => {
    setLevelFilters((prevState) => prevState.filter((t) => t !== item));
  };

  const renderTags = () => {
    return SPELL_TYPES.map((t) => {
      return (
        <Tag key={t} name={t} addItem={addFilter} removeItem={removeFilter} />
      );
    });
  };

  const renderLevelTags = () => {
    const levels = ["cantrip", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const levelLabels = {
      cantrip: "Cantrip",
      "1": "1st",
      "2": "2nd",
      "3": "3rd",
      "4": "4th",
      "5": "5th",
      "6": "6th",
      "7": "7th",
      "8": "8th",
      "9": "9th",
    };

    return levels.map((level) => {
      return (
        <Tag
          key={level}
          name={levelLabels[level]}
          addItem={() => addLevelFilter(level)}
          removeItem={() => removeLevelFilter(level)}
        />
      );
    });
  };

  const ModifySpellsButton = () => {
    return (
      <button
        className={`action-button ${styles.modifySpellsButton}`}
        onClick={() => router.push(`/character/${id}/spells`)}
      >
        <PencilSimple size={24} />
        <p>Modify Spells</p>
      </button>
    );
  };

  const renderClassRows = () => {
    if (!Array.isArray(character?.class)) {
      return null;
    }
    return character.class.map((c) => {
      if (!c?.spellcasting) return null;
      if (c?.name === "Barbarian") return null;

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

  // Calculate spell counts
  const totalSpells = character?.spells?.length || 0;
  const preparedSpells = character?.spells?.filter(
    (s) => s.level !== "cantrip" && (s.prepared === true || s.prepared === "true")
  ).length || 0;

  return (
    <div>
      <div className={styles.headingContainer}>
        {isMobile && isOwner && ModifySpellsButton()}
        <div className={styles.leftContainer}>
          <div className={styles.searchRow}>
            <Search
              search
              onChange={setSearch}
              value={search}
              placeholder="Search for a spell"
            />
          </div>
          <div className={styles.quickFiltersRow}>
            <button
              className={
                preparedOnly
                  ? "action-button highlighted-action-button"
                  : "action-button"
              }
              onClick={() => setPreparedOnly(!preparedOnly)}
            >
              Prepared
            </button>
            <button
              className={
                concentrationOnly
                  ? "action-button highlighted-action-button"
                  : "action-button"
              }
              onClick={() => setConcentrationOnly(!concentrationOnly)}
            >
              Concentration
            </button>
            <button
              className={
                ritualOnly
                  ? "action-button highlighted-action-button"
                  : "action-button"
              }
              onClick={() => setRitualOnly(!ritualOnly)}
            >
              Ritual
            </button>
          </div>
          <h5>Spell Type</h5>
          <div className={styles.tagContainer}>{renderTags()}</div>
          <h5>Spell Level</h5>
          <div className={styles.tagContainer}>{renderLevelTags()}</div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerHeader}>
            <div>
              <p>
                <b>Focus: </b>
                {character.spellcastingFocus || "None"}
              </p>
              <p>
                <b>Spells prepared: </b>
                {preparedSpells} of {character?.maxPrepared || "∞"}
              </p>
            </div>
            {!isMobile && isOwner && ModifySpellsButton()}
          </div>
          {renderClassRows()}
          <div className={styles.spellCount}>
            <p>
              <b>Showing: </b>
              {displayed.length} of {totalSpells}
            </p>
          </div>
        </div>
      </div>
      <CharacterSpells spells={displayed} />
    </div>
  );
};

export default CharacterSpellcasting;
