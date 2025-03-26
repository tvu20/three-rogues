import styles from "./inputs.module.css";

const SubmitInput = () => {
  return (
    <input
      type="submit"
      className={`action-button highlighted-action-button ${styles.submitInput}`}
    />
  );
};

export default SubmitInput;
