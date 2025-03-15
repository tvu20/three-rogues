import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import useMediaQuery from "../../../utils/useMediaQuery";
import Loader from "../../shared/layout/Loader";
import styles from "./CharacterSkills.module.css";
import CharacterClassFeatures from "./class/CharacterClassFeatures";
import CharacterRaceFeatures from "./race/CharacterRaceFeatures";

const CharacterSkills = () => {
  const bottomPadding = useMediaQuery(1050);

  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (!character) {
    return <Loader />;
  }

  const classFeatures = character.features.filter(
    (feature) => feature.source === "class"
  );

  const raceFeatures = character.features.filter(
    (feature) => feature.source === "race"
  );

  const backgroundFeatures = character.features.filter(
    (feature) => feature.source === "background"
  );

  return (
    <div className="split-grid-container">
      <div className={styles.leftContainer}>
        <CharacterClassFeatures
          features={classFeatures}
          classList={character.class}
        />
        <CharacterRaceFeatures features={raceFeatures} title={character.race} />
        <CharacterRaceFeatures
          features={backgroundFeatures}
          title={character.background}
          type="Background"
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.item}></div>
        {bottomPadding && <div className={styles.bottomPadding}></div>}
      </div>
    </div>
  );
};

export default CharacterSkills;
