import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useGetCharacterQuery } from "../../app/api/apiSlice";
import { setLiveCharacter } from "../../app/character/characterSlice";
import Layout from "../../components/Layout";
import { useAppDispatch } from "../../utils/redux";
import Loader from "../Loader";
import CharacterHeader from "./header/CharacterHeader";
import CharacterTabs from "./tabs/CharacterTabs";

export default function CharacterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
  }, [character, dispatch]);

  if (isLoading) return <Loader />;

  if (!character) {
    router.push("/");
  }

  return (
    <Layout>
      <CharacterHeader id={id} />
      <CharacterTabs />
      {/* <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Character Details</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(character, null, 2)}
        </pre>
      </div> */}
    </Layout>
  );
}
