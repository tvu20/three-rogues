import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../../app/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/redux";
import Loader from "../../../Loader";

import { AC } from "../../../../app/character/characterDefs";
import styles from "./CharacterCombat.module.css";

const CharacterCombat = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  const liveStats = useAppSelector((state) => state.character.liveStats);

  const calculateAC = (acObject: AC) => {
    return acObject.armor + acObject.shield + acObject.bonus;
  };

  if (!liveStats) {
    return <Loader />;
  }

  return (
    <div className={`content-box`}>
      <div className={styles.topRow}>
        <div className={`${styles.displayValue} ${styles.ac}`}>
          <h5>AC</h5>
          <h3>{character?.ac ? calculateAC(character.ac) : 0}</h3>
        </div>
        <div className={`${styles.displayValue} ${styles.initiative}`}>
          <h5>Initiative</h5>
          <h3>+{character?.initiative ?? 0}</h3>
        </div>
        <div className={`${styles.displayValue} ${styles.speed}`}>
          <h5>Speed</h5>
          <h3>
            {character?.speed.walk}
            <span>ft</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CharacterCombat;
