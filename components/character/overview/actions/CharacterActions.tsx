import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../../app/api/apiSlice";
import {
  LINKED_ABILITY,
  Weapon,
} from "../../../../app/character/characterDefs";
import { getAbilityModifier } from "../../../../utils/characterUtils";
import Loader from "../../../shared/layout/Loader";
import ExpandableTable from "../../shared/ExpandableTable";
import FeatureBlock from "../../shared/FeatureBlock";
import styles from "./CharacterActions.module.css";
const COLUMNS = ["name", "range", "hit", "damage", "damageType", "properties"];

const MOBILE_COLUMNS = ["name", "hit", "damage"];

const COLUMN_HEADERS = [
  "Attack",
  "Range",
  "Hit",
  "Damage",
  "Type",
  "Properties",
];

const CharacterActions = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character, isLoading } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (isLoading || !character) {
    return <Loader />;
  }

  const createFeatureBlocks = (linkedAbility: LINKED_ABILITY) => {
    const features = character?.features.filter(
      (feature) => feature.linkedAbility === linkedAbility
    );

    return features?.map((feature) => (
      <FeatureBlock
        key={feature.id}
        title={feature.name}
        description={feature.description}
        className={styles.featureBlock}
        options={feature.options}
      />
    ));
  };

  const createExpandableTable = (linkedAbility: LINKED_ABILITY) => {
    let weapons: Weapon[] =
      character?.weapons.filter(
        (weapon) => weapon.linkedAbility === linkedAbility && weapon.equipped
      ) || [];

    const updatedWeapons = weapons?.map((weapon) => {
      if (weapon.ability) {
        const hit =
          getAbilityModifier(Number(character.abilityScores[weapon.ability])) +
          (weapon.proficient ? Number(character.proficiencyBonus) : 0) +
          (Number(weapon.hitBonus) || 0);

        return {
          ...weapon,
          hit: `+${hit}`,
        };
      }
      return weapon;
    });

    if (updatedWeapons.length) {
      return (
        <ExpandableTable
          columns={COLUMNS}
          columnHeaders={COLUMN_HEADERS}
          columnSpacing={"2fr 1fr 0.5fr 1fr 1fr 2fr"}
          mobileColumns={MOBILE_COLUMNS}
          mobileColumnHeaders={MOBILE_COLUMNS}
          mobileColumnSpacing={"1fr 0.5fr 1fr"}
          data={updatedWeapons}
          className={styles.actionTable}
        />
      );
    }
  };

  return (
    <div className={`content-box ${styles.container}`}>
      <div className={styles.section}>
        <h2 className={`section-header ${styles.actionTitle}`}>
          Actions
          <span>Attacks per action: {character?.attacksPerAction || "1"}</span>
        </h2>
        <p className={styles.subtitle}>
          Attack, Dash, Disengage, Dodge, Grapple, Help, Hide, Improvise,
          Influence, Magic, Ready, Search, Shove, Study, Utilize
        </p>
        {createExpandableTable("action")}
        {createFeatureBlocks("action")}
      </div>
      <div className={styles.section}>
        <h2 className="section-header">Bonus Actions</h2>
        <p className={styles.subtitle}>Two-Weapon Fighting</p>
        {createExpandableTable("bonusaction")}
        {createFeatureBlocks("bonusaction")}
      </div>
      <div className={styles.section}>
        <h2 className="section-header">Reactions</h2>
        <p className={styles.subtitle}>Opportunity Attack</p>
        {createExpandableTable("reaction")}
        {createFeatureBlocks("reaction")}
      </div>
      <div className={`${styles.section} ${styles.otherSection}`}>
        <h2 className="section-header">Other</h2>
        {createFeatureBlocks("other")}
      </div>
    </div>
  );
};

export default CharacterActions;
