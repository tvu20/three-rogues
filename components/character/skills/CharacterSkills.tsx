import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import useMediaQuery from "../../../utils/useMediaQuery";
import Loader from "../../shared/layout/Loader";
import styles from "./CharacterSkills.module.css";
import CharacterClassFeatures from "./class/CharacterClassFeatures";
import CharacterFeats from "./feats/CharacterFeats";
import CharacterRaceFeatures from "./race/CharacterRaceFeatures";
import CharacterTrainingProfs from "./training/CharacterTrainingProfs";
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

  const feats = character.features.filter(
    (feature) => feature.source === "feat"
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
        <CharacterTrainingProfs
          armor={character.armorProficiencies || ""}
          weapons={character.weaponProficiencies || ""}
          tools={character.toolProficiencies || ""}
          languages={character.languagesKnown || ""}
        />
        <CharacterFeats feats={feats} />
        {bottomPadding && <div className={styles.bottomPadding}></div>}
      </div>
    </div>
  );
};

export default CharacterSkills;
