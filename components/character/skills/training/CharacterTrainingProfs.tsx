import styles from "./CharacterTrainingProfs.module.css";

type CharacterTrainingProfsProps = {
  armor: string;
  weapons: string;
  tools: string;
  languages: string;
};

const CharacterTrainingProfs = ({
  armor,
  weapons,
  tools,
  languages,
}: CharacterTrainingProfsProps) => {
  return (
    <div className={`content-box ${styles.container}`}>
      <div className={styles.item}>
        <h3>Armor</h3>
        <p>{armor || "None"}</p>
      </div>
      <div className={styles.item}>
        <h3>Weapons</h3>
        <p>{weapons || "None"}</p>
      </div>
      <div className={styles.item}>
        <h3>Tools</h3>
        <p>{tools || "None"}</p>
      </div>
      <div className={styles.item}>
        <h3>Languages</h3>
        <p>{languages || "None"}</p>
      </div>
    </div>
  );
};

export default CharacterTrainingProfs;
