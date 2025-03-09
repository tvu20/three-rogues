import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../utils/redux";
import Loader from "../../Loader";
import CharacterActionButtons from "./CharacterActionButtons";
import styles from "./CharacterOverview.module.css";
import CharacterStats from "./stats/CharacterStats";

const CharacterOverview = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  // const { data: character } = useGetCharacterQuery(id, {
  //   skip: !id,
  // });

  const liveStats = useAppSelector((state) => state.character.liveStats);

  if (!liveStats) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <CharacterStats />
        <div className={styles.item2} style={{ height: "200px" }}>
          item two
        </div>
      </div>
      <div className={styles.rightContainer}>
        <CharacterActionButtons />
        <div className={styles.item} style={{ height: "300px" }}>
          item three
        </div>
        <div className={styles.item2} style={{ height: "600px" }}>
          item four
        </div>
      </div>
    </div>
  );
};

export default CharacterOverview;
