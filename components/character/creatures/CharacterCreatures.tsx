import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import { Creature } from "../../../app/character/characterDefs";
import Search from "../../shared/inputs/Search";
import Loader from "../../shared/layout/Loader";

import ExpandableTable from "../shared/ExpandableTable";

import styles from "./CharacterCreatures.module.css";

const COLUMNS = ["name", "ac", "maxHP", "speed", "type", "notes"];

const COLUMN_HEADERS = ["Name", "AC", "Hit Points", "Speed", "Type", "Notes"];

const MOBILE_COLUMNS = ["name", "ac", "maxHP", "speed"];

const MOBILE_HEADERS = ["Name", "AC", "HP", "Speed"];

const CharacterCreatures = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState<Creature[]>([]);

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (!character) {
    return <Loader />;
  }

  useEffect(() => {
    if (!character.creatures) return;

    let temp = [...character.creatures];

    if (search !== "" || search.length > 0) {
      temp = temp.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setDisplayed(temp);
  }, [search, character?.creatures]);

  return (
    <div>
      <div className={styles.headingContainer}>
        <Search
          search
          onChange={setSearch}
          value={search}
          placeholder="Search for a stat block"
        />
        <button className="action-button">Modify Creatures</button>
      </div>
      <ExpandableTable
        columns={COLUMNS}
        columnHeaders={COLUMN_HEADERS}
        columnSpacing={"1fr 0.5fr 0.5fr 0.7fr 0.7fr 1fr"}
        mobileColumns={MOBILE_COLUMNS}
        mobileColumnHeaders={MOBILE_HEADERS}
        mobileColumnSpacing={"1fr 0.5fr 0.5fr 1fr"}
        data={displayed}
        creature
      />
    </div>
  );
};

export default CharacterCreatures;
