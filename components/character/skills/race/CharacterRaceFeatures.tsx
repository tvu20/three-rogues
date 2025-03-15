import { Feature } from "../../../../app/character/characterDefs";
import FeatureBlock from "../../shared/FeatureBlock";
import styles from "./CharacterRaceFeatures.module.css";

type CharacterRaceFeaturesProps = {
  features: Feature[];
  title: string;
  type?: string;
};

const CharacterRaceFeatures = ({
  features,
  title,
  type = "Race",
}: CharacterRaceFeaturesProps) => {
  const createFeaturesBlock = () => {
    if (features.length === 0) {
      return <p>No features found. </p>;
    }
    return features.map((feature) => (
      <FeatureBlock
        key={feature.id}
        title={feature.name}
        description={feature.description}
        linkedAbility={feature.linkedAbility}
        options={feature.options}
      />
    ));
  };
  return (
    <div className={`content-box ${styles.container}`}>
      <h6>{type}</h6>
      <h2>{title}</h2>
      {createFeaturesBlock()}
    </div>
  );
};

export default CharacterRaceFeatures;
