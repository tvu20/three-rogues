import { useRouter } from "next/router";
import { useGetCharactersQuery } from "../../app/api/apiSlice";
import { Character } from "../../app/character/characterDefs";
import Loader from "../shared/layout/Loader";
import styles from "./CharacterList.module.css";

const CharacterList = () => {
  const { data: characters, isLoading } = useGetCharactersQuery();

  const router = useRouter();

  const showClasses = (character: Character) => {
    return character?.class?.map((c) => `${c.name} ${c.level}`).join(" / ");
  };

  const showSubClasses = (character: Character) => {
    return character?.class?.map((c) => `${c.subclass}`).join(" / ");
  };
  const renderCharacters = () => {
    return characters?.map((character) => (
      <div
        key={character.id}
        className={`content-box ${styles.container}`}
        onClick={() => router.push(`/character/${character.id}`)}
      >
        <img
          className={styles.avatar}
          src={
            character?.avatar ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          alt={character?.name ?? "Character avatar"}
          loading="lazy"
        />
        <div className={styles.nameContainer}>
          <div>
            <h1 className={styles.name}>{character?.name}</h1>
            <h4 className={styles.pronouns}>{character?.pronouns}</h4>
          </div>
          <h2 className={styles.class}>{showClasses(character)}</h2>
          <h4 className={styles.subclass}>{showSubClasses(character)}</h4>
        </div>
      </div>
    ));
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{"My Characters"}</h1>
      <div className={styles.itemContainer}>{renderCharacters()}</div>
    </div>
  );
};

export default CharacterList;
