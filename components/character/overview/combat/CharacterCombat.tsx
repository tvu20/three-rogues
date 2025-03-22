import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../../app/api/apiSlice";
import { useAppSelector } from "../../../../utils/redux";
import Loader from "../../../shared/layout/Loader";
import CharacterCombatStats from "./CharacterCombatStats";
import CharacterHP from "./CharacterHP";

const CharacterCombat = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  const liveStats = useAppSelector((state) => state.character.liveStats);

  if (!liveStats || !character) {
    return <Loader />;
  }

  return (
    <div className={`content-box`}>
      <CharacterCombatStats character={character} />
      <CharacterHP character={character} liveStats={liveStats} />
    </div>
  );
};

export default CharacterCombat;
