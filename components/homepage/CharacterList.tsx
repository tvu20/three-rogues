import Link from "next/link";
import { useGetCharactersQuery } from "../../app/api/apiSlice";

const CharacterList = () => {
  console.log("character list");
  const { data: characters, isLoading } = useGetCharactersQuery();
  const renderCharacters = () => {
    return characters?.map((character) => (
      <Link key={character.id} href={`/character/${character.id}`}>
        {character.name} <br />
      </Link>
    ));
  };

  if (isLoading) return <div>Loading characters...</div>;

  return <div>{renderCharacters()}</div>;
};

export default CharacterList;
