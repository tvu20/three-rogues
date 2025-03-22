import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import Loader from "../../shared/layout/Loader";
import CharacterCurrency from "./CharacterCurrency";
import CharacterItems from "./CharacterItems";

const CharacterInventory = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (!character) {
    return <Loader />;
  }

  return (
    <div className="split-grid-container">
      <div>
        <CharacterItems
          items={character.inventory}
          weapons={character.weapons.filter((w) => w.inInventory)}
        />
      </div>
      <div>
        <CharacterCurrency currency={character.currency} />
      </div>
    </div>
  );
};

export default CharacterInventory;
