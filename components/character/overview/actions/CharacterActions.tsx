import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../../app/api/apiSlice";
import { LINKED_ABILITY } from "../../../../app/character/characterDefs";
import Loader from "../../../shared/Loader";
import FeatureBlock from "../../shared/FeatureBlock";
import styles from "./CharacterActions.module.css";

const CharacterActions = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character, isLoading } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (isLoading) {
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

  return (
    <div className={`content-box ${styles.container}`}>
      <div className={styles.section}>
        <h2 className={`${styles.title} ${styles.actionTitle}`}>
          Actions
          <span>Attacks per action: {character?.attacksPerAction || "1"}</span>
        </h2>
        <p className={styles.subtitle}>
          Attack, Dash, Disengage, Dodge, Grapple, Help, Hide, Improvise,
          Influence, Magic, Ready, Search, Shove, Study, Utilize
        </p>
        {createFeatureBlocks("action")}
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Bonus Actions</h2>
        <p className={styles.subtitle}>Two-Weapon Fighting</p>
        {createFeatureBlocks("bonusaction")}
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Reactions</h2>
        <p className={styles.subtitle}>Opportunity Attack</p>
        {createFeatureBlocks("reaction")}
      </div>
      <div className={`${styles.section} ${styles.otherSection}`}>
        <h2 className={styles.title}>Other</h2>
        {createFeatureBlocks("other")}
      </div>
    </div>
  );
};

export default CharacterActions;
