import { Feature } from "../../../../app/character/characterDefs";
import FeatureBlock from "../../shared/FeatureBlock";
import styles from "./CharacterFeats.module.css";

type CharacterFeatsProps = {
  feats: Feature[];
};

const CharacterFeats = ({ feats }: CharacterFeatsProps) => {
  const createFeaturesBlock = () => {
    if (feats.length === 0) {
      return <p>No feats found.</p>;
    }
    return feats.map((feature) => (
      <FeatureBlock
        key={feature.id}
        title={feature.name}
        description={feature.description}
        options={feature.options}
      />
    ));
  };
  return (
    <div className={`content-box ${styles.container}`}>
      <h2 className="small-section-header">Feats</h2>
      {createFeaturesBlock()}
    </div>
  );
};

export default CharacterFeats;
