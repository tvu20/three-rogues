import { setConditions } from "../../../../app/character/characterSlice";
import { useAppDispatch } from "../../../../utils/redux";
import EditableTextCell from "../../../shared/inputs/EditableTextCell";

import styles from "./CharacterHP.module.css";
type CharacterConditionsProps = {
  conditions: string;
  defenses: string;
};

const CharacterConditions = ({
  conditions,
  defenses,
}: CharacterConditionsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.conditionsContainer}>
      <div className={`${styles.conditionsRow} ${styles.conditions}`}>
        <EditableTextCell
          value={conditions}
          onBlur={(value) => dispatch(setConditions(value))}
          defaultValue="None"
        />
        <h3>Conditions</h3>
      </div>
      <div className={`${styles.conditionsRow} ${styles.defenses}`}>
        <h3>Defenses</h3>
        <p>{defenses}</p>
      </div>
    </div>
  );
};

export default CharacterConditions;
