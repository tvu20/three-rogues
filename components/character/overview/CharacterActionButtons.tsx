import styles from "./CharacterActionButtons.module.css";

const CharacterActionButtons = () => {
  return (
    <div className={styles.container}>
      <button className="action-button">Short Rest</button>
      <button className="action-button">Long Rest</button>
      <button className="action-button highlighted-action-button">Save</button>
    </div>
  );
};

export default CharacterActionButtons;
