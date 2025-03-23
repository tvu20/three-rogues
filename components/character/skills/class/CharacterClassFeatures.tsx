import { Class, Feature } from "../../../../app/character/characterDefs";
import FeatureBlock from "../../shared/FeatureBlock";
import styles from "./CharacterClassFeatures.module.css";

type CharacterClassFeaturesProps = {
  features: Feature[];
  classList: Class[];
};

const CharacterClassFeatures = ({
  features,
  classList,
}: CharacterClassFeaturesProps) => {
  const sortedClassList = [...classList].sort((a) =>
    a.isStartingClass ? -1 : 1
  );
  const sortedFeatures = [...features].sort((a, b) => {
    if (a.level === null) return 1;
    if (b.level === null) return -1;
    return a.level - b.level;
  });

  const createFeatureBlock = (className: string) => {
    const features = sortedFeatures.filter(
      (feature) => feature.class === className
    );

    if (features.length === 0)
      return <p style={{ fontWeight: 300 }}>No features found. </p>;
    return features.map((feature) => (
      <FeatureBlock
        key={feature.id}
        title={feature.name}
        description={feature.description}
        level={feature.level ?? undefined}
        linkedAbility={feature.linkedAbility}
        options={feature.options}
      />
    ));
  };

  const createFeatureBlocks = () => {
    return sortedClassList.map((item) => {
      return (
        <div key={item.name} className={styles.classContainer}>
          <h2 className={`${styles.classHeading} section-header`}>
            {item.name}
            <span>{item.subclass}</span>
          </h2>
          {createFeatureBlock(item.name)}
        </div>
      );
    });
  };

  return (
    <div className={`content-box ${styles.container}`}>
      {createFeatureBlocks()}
    </div>
  );
};

export default CharacterClassFeatures;
