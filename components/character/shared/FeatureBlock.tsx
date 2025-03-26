import { LINKED_ABILITY } from "../../../app/character/characterDefs";
import styles from "./FeatureBlock.module.css";

const LINKED_ABILITY_LABELS = {
  action: "Action",
  bonusaction: "Bonus Action",
  reaction: "Reaction",
  other: "Other",
};

type FeatureBlockProps = {
  title: string;
  description: string;
  level?: number | null;
  linkedAbility?: LINKED_ABILITY;
  options?: {
    [key: string]: string;
  } | null;
  className?: string;
};

const FeatureBlock = ({
  title,
  description,
  level,
  linkedAbility,
  options,
  className,
}: FeatureBlockProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h4>{title}</h4>
        {level && <div className={styles.level}>Lv. {level}</div>}
      </div>

      {linkedAbility && (
        <h6 className={level ? styles.marginUp : ""}>
          Affects: {LINKED_ABILITY_LABELS[linkedAbility]}
        </h6>
      )}
      <p>{description}</p>
      {options && (
        <div className={styles.options}>
          {Object.entries(options).map(([key, value]) => (
            <p key={key}>
              <i>{key}: </i>
              {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureBlock;
