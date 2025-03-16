import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import { Spell } from "../../../app/character/characterDefs";
import Search from "../../shared/inputs/Search";
import Tag from "../../shared/inputs/Tag";
import Loader from "../../shared/layout/Loader";
import styles from "./CharacterSpellcasting.module.css";
import CharacterSpells from "./CharacterSpells";
const SPELL_TYPES = [
  "damage",
  "buff",
  "debuff",
  "utility",
  "protection",
  "control",
];

const CharacterSpellcasting = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState<Spell[]>([]);
  const [filters, setFilters] = useState<string[]>([]);

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (!character) {
    return <Loader />;
  }

  useEffect(() => {
    if (!character.spells) return;

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
  }, [search, character.spells, filters]);

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

  return (
    <div>
      <div className={styles.headingContainer}>
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
        <div className={styles.rightContainer} style={{ width: "400px" }}>
          blah blah blah blah
        </div>
      </div>
      <CharacterSpells spells={displayed} />
    </div>
  );
};

export default CharacterSpellcasting;
