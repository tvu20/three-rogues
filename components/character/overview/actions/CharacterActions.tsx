import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../../app/api/apiSlice";
import Loader from "../../../shared/Loader";
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

  return (
    <div className={`content-box ${styles.container}`}>
      <div className={styles.section}>
        <h2 className={`${styles.title} ${styles.actionTitle}`}>
          Actions
          <span>Attacks per action: {character?.attacksPerAction || "1"}</span>
        </h2>
        <p>
          Attack, Dash, Disengage, Dodge, Grapple, Help, Hide, Improvise,
          Influence, Magic, Ready, Search, Shove, Study, Utilize
        </p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Bonus Actions</h2>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Reactions</h2>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>Other</h2>
      </div>
    </div>
  );
};

export default CharacterActions;
