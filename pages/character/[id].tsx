import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import CharacterHeader from "../../components/character/CharacterHeader";
import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../app/api/apiSlice";
import { useAppDispatch } from "../../utils/redux";
import { setLiveCharacter } from "../../app/character/characterSlice";

export default function Character() {
  const dispatch = useAppDispatch();

  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character, isLoading } = useGetCharacterQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (character) {
      dispatch(
        setLiveCharacter({
          id: character.id,
          liveStats: character.liveStats,
          name: character.name,
        })
      );
    }
  }, [character]);

  if (isLoading) return <div>Loading...</div>;

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <Layout>
      <CharacterHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Character Details</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(character, null, 2)}
        </pre>
      </div>
    </Layout>
  );
}
