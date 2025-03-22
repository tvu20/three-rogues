import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import Loader from "../../shared/layout/Loader";

import styles from "./CharacterBackstory.module.css";

const CharacterBackstory = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (!character) {
    return <Loader />;
  }

  const renderImageGallery = () => {
    return character.images.map((image) => <img src={image} alt="Character" />);
  };

  return (
    <div className="split-grid-container">
      <div>
        <div className={`content-box ${styles.backstoryContainer}`}>
          <h2 className="section-header">Backstory</h2>
          {/* TODO: handle markdown/text formatting */}
          <p>{character.backstory}</p>
        </div>
      </div>
      <div>
        <div className={`content-box ${styles.appearanceContainer}`}>
          <h2 className="small-section-header">Appearance</h2>
          <div className={styles.appearanceValues}>
            <p>
              <b>Height:</b> {character.height}
            </p>
            <p>
              <b>Hair:</b> {character.hair}
            </p>
            <p>
              <b>Eyes:</b> {character.eyes}
            </p>
            <p>
              <b>Skin:</b> {character.skin}
            </p>
          </div>
        </div>
        <div className={`content-box ${styles.alliesContainer}`}>
          <h2>Allies</h2>
          <p>{character.allies}</p>
          <div className={styles.spacer} />
          <h2>Organizations</h2>
          <p>{character.organization}</p>
        </div>
        <div className={`content-box ${styles.imageGallery}`}>
          <h2 className="small-section-header">Image Gallery</h2>
          {renderImageGallery()}
        </div>
      </div>
    </div>
  );
};

export default CharacterBackstory;
