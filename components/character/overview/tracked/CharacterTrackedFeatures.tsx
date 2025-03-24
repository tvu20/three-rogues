import { Feature, LiveStats } from "../../../../app/character/characterDefs";
import { setTrackedFeatures } from "../../../../app/character/characterSlice";
import { useAppDispatch } from "../../../../utils/redux";
import styles from "./CharacterTrackedFeatures.module.css";

type CharacterTrackedItemProps = {
  item: Feature;
  onChange: (id: string, used: number) => void;
};

type CharacterTrackedFeaturesProps = {
  liveStats: LiveStats;
};

const CharacterTrackedItem = ({
  item,
  onChange,
}: CharacterTrackedItemProps) => {
  const createCheckboxes = (used, max) => {
    return Array.from({ length: max }, (_, i) => {
      return (
        <input
          className={styles.checkbox}
          type="checkbox"
          key={i}
          checked={used >= i + 1}
          onChange={() => {
            // if this is the last checked checkbox, uncheck it and set used to i
            if (used === i + 1) {
              onChange(item.id ?? "", i);
            } else {
              onChange(item.id ?? "", i + 1);
            }
          }}
        />
      );
    });
  };

  return (
    <details className={styles.trackedItem}>
      <summary>
        <div className={styles.summaryDisplay}>
          <h5>{item.name}</h5>
          <div className={styles.summaryTracker}>
            {createCheckboxes(item.used, item.max)}/ {item.resetsOn} rest
          </div>
        </div>
      </summary>
      <p className={styles.description}>
        {item.shortDescription || item.description}
      </p>
    </details>
  );
};

const CharacterTrackedFeatures = ({
  liveStats,
}: CharacterTrackedFeaturesProps) => {
  const dispatch = useAppDispatch();

  const createItems = () => {
    return liveStats.trackedFeatures?.map((feature) => {
      return (
        <CharacterTrackedItem
          key={feature.id}
          item={feature}
          onChange={(id, used) => dispatch(setTrackedFeatures({ id, used }))}
        />
      );
    });
  };

  if (liveStats.trackedFeatures?.length === 0) return null;
  return (
    <div className={`content-box ${styles.container}`}>{createItems()}</div>
  );
};

export default CharacterTrackedFeatures;
