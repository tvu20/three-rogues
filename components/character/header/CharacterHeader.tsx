import { useRouter } from "next/router";
import React from "react";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import styles from "./CharacterHeader.module.css";

type Props = {
  id: string;
};

const CharacterHeader: React.FC<Props> = ({ id }) => {
  const { data: character } = useGetCharacterQuery(id);
  const router = useRouter();

  const showClasses = () => {
    return character?.class?.map((c) => `${c.name} ${c.level}`).join(" / ");
  };

  const showSubClasses = () => {
    return character?.class?.map((c) => `${c.subclass}`).join(" / ");
  };

  const infoBlock = (title: string, value: string) => {
    return (
      <div className={styles.infoBlock}>
        <h4 className={styles.infoBlockTitle}>{title}</h4>
        <h3 className={styles.infoBlockValue}>{value}</h3>
      </div>
    );
  };
  return (
    <div className={styles.container}>
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
        <h2 className={styles.class}>{showClasses()}</h2>
        <h4 className={styles.subclass}>{showSubClasses()}</h4>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.actionButtons}>
          <button className="action-button">download</button>
          <button
            className="action-button"
            onClick={() => router.push(`/edit/${id}`)}
          >
            edit
          </button>
        </div>
        <div className={styles.infoContainer}>
          {infoBlock("Race", character?.race || "")}
          {infoBlock("Background", character?.background || "")}
          {infoBlock("Alignment", character?.alignment || "")}
          {infoBlock("Age", String(character?.age || ""))}
        </div>
      </div>
    </div>
  );
};

export default CharacterHeader;
