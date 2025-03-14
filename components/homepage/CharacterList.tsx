import Link from "next/link";
import { useGetCharactersQuery } from "../../app/api/apiSlice";
import Loader from "../shared/layout/Loader";

const CharacterList = () => {
  const { data: characters, isLoading } = useGetCharactersQuery();
  const renderCharacters = () => {
    return characters?.map((character) => (
      <Link key={character.id} href={`/character/${character.id}`}>
        {character.name} <br />
      </Link>
    ));
  };

  if (isLoading) return <Loader />;

  return <div>{renderCharacters()}</div>;
};

export default CharacterList;
