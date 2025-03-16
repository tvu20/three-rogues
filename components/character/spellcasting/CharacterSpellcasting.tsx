import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import Loader from "../../shared/layout/Loader";
import CharacterSpells from "./CharacterSpells";

const CharacterSpellcasting = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (!character) {
    return <Loader />;
  }

  return (
    <div>
      <CharacterSpells spells={character.spells} />
    </div>
  );
};

export default CharacterSpellcasting;
