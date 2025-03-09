import { Sun, SunDim } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../../app/api/apiSlice";
import { setInspiration } from "../../../../app/character/characterSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/redux";
import Loader from "../../../Loader";
import styles from "./CharacterStats.module.css";

const CharacterStats = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  const liveStats = useAppSelector((state) => state.character.liveStats);

  console.log(liveStats);

  if (!liveStats) {
    return <Loader />;
  }

  return (
    <div className={`content-box ${styles.container}`}>
      <div className={styles.topRow}>
        <div className={styles.statsContainer}>
          <div className={styles.proficiency}>
            <h5>Proficiency</h5>
            <h3>+{character?.proficiencyBonus}</h3>
            <p>Bonus</p>
          </div>
          <div className={styles.passive}>
            {/* TO FILL IN LATER */}
            <div className={styles.passiveRow}>
              <h5>Passive Perception</h5>
              <p>11</p>
            </div>
            <div className={styles.passiveRow}>
              <h5>Passive Investigation</h5>
              <p>20</p>
            </div>
            <div className={styles.passiveRow}>
              <h5>Passive Insight</h5>
              <p>23</p>
            </div>
          </div>
        </div>
        <div className={styles.darkvision}>
          <h5>Darkvision</h5>
          {character?.darkvision && (
            <h3>
              {character?.darkvision}
              <span> ft</span>
            </h3>
          )}
          {!character?.darkvision && <p>None</p>}
        </div>
        <div className={styles.inspiration}>
          <h5>Inspiration</h5>
          <button
            onClick={() => dispatch(setInspiration(!liveStats?.inspiration))}
          >
            {liveStats?.inspiration ? (
              <Sun className={styles.inspirationIcon} size={38} />
            ) : (
              <SunDim className={styles.inspirationIconDim} size={38} />
            )}
          </button>
        </div>
      </div>
      <div className={styles.bottomRow}></div>
    </div>
  );
};

export default CharacterStats;
