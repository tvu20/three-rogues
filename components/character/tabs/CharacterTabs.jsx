import {
  Backpack,
  BookOpenText,
  Gear,
  MagicWand,
  PawPrint,
  Person,
} from "@phosphor-icons/react";
import { useState } from "react";
import useMediaQuery from "../../../utils/useMediaQuery";

import CharacterOverview from "../overview/CharacterOverview";
import CharacterSkills from "../skills/CharacterSkills";
import styles from "./CharacterTabs.module.css";

const TABS = [
  {
    id: "overview",
    label: "Overview",
    component: <CharacterOverview />,
    icon: Person,
  },
  {
    id: "skills",
    label: "Skills",
    component: <CharacterSkills />,
    icon: Gear,
  },
  {
    id: "spellcasting",
    label: "Spellcasting",
    component: <div>Spellcasting</div>,
    icon: MagicWand,
  },
  {
    id: "inventory",
    label: "Inventory",
    component: <div>Inventory</div>,
    icon: Backpack,
  },
  {
    id: "creatures",
    label: "Creatures",
    component: <div>Creatures</div>,
    icon: PawPrint,
  },
  {
    id: "backstory",
    label: "Backstory",
    component: <div>Backstory</div>,
    icon: BookOpenText,
  },
];
const CharacterTabs = () => {
  const isBreakpoint = useMediaQuery(1000);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {TABS.map((tab) => (
          <button
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon
              className={styles.tabIcon}
              size={isBreakpoint ? 28 : 22}
            />
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {TABS.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default CharacterTabs;
