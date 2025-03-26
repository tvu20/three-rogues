import { useEffect, useState } from "react";
import { Item, Weapon } from "../../../app/character/characterDefs";
import { ITEM_TYPES } from "../../../app/character/characterMapping";
import Search from "../../shared/inputs/Search";
import Tag from "../../shared/inputs/Tag";

import { useRouter } from "next/router";
import { ITEM_TYPE } from "../../../app/character/characterDefs";
import ExpandableTable from "../shared/ExpandableTable";
import styles from "./CharacterInventory.module.css";
const COLUMNS = ["equipped", "name", "quantity", "type", "notes"];

const MOBILE_COLUMNS = ["equipped", "name", "quantity"];

const COLUMN_HEADERS = ["", "Name", "Qty", "Type", "Notes"];

const MOBILE_HEADERS = ["", "Name", "Qty"];

type CharacterItemsProps = {
  id: string;
  items: Item[];
  weapons: Weapon[];
};
const CharacterItems = ({ id, items, weapons }: CharacterItemsProps) => {
  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState<Item[]>([]);
  const [filters, setFilters] = useState<ITEM_TYPE[]>([]);
  const router = useRouter();

  const addFilter = (item: ITEM_TYPE) => {
    setFilters((prevState) => [...prevState, item]);
  };

  const removeFilter = (item: ITEM_TYPE) => {
    setFilters((prevState) => prevState.filter((t) => t !== item));
  };

  useEffect(() => {
    // if (!items || !weapons) return;

    let tempItems = [...items];

    const tempWeapons = [...weapons];

    if (filters.length > 0) {
      tempItems = tempItems.filter((r) =>
        filters.some((f: ITEM_TYPE) => r.type.includes(f))
      );
    }

    let temp;
    if (filters.includes("weapon") || filters.length === 0) {
      temp = [...tempItems, ...tempWeapons];
    } else {
      temp = tempItems;
    }

    if (search !== "" || search.length > 0) {
      temp = temp.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setDisplayed(temp);
  }, [items, weapons, filters, search]);

  const renderTags = () => {
    return ITEM_TYPES.map((t) => {
      return (
        <Tag key={t} name={t} addItem={addFilter} removeItem={removeFilter} />
      );
    });
  };

  return (
    <div className={`content-box ${styles.itemsContainer}`}>
      <h2 className="section-header">Inventory</h2>
      <div className={styles.itemsHeader}>
        <Search
          search
          onChange={setSearch}
          value={search}
          placeholder="Search for an item"
          small
        />
        <button
          className="action-button"
          onClick={() => router.push(`/character/${id}/inventory`)}
        >
          Manage Items
        </button>
      </div>
      <div className={styles.tagContainer}>{renderTags()}</div>
      <ExpandableTable
        columns={COLUMNS}
        columnHeaders={COLUMN_HEADERS}
        columnSpacing={"24px 2fr 60px 1fr 1fr"}
        mobileColumns={MOBILE_COLUMNS}
        mobileColumnHeaders={MOBILE_HEADERS}
        mobileColumnSpacing={"40px 1fr 0.5fr"}
        data={displayed}
      />
    </div>
  );
};

export default CharacterItems;
