import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useGetCharacterQuery } from "../../app/api/apiSlice";
import { setLiveCharacter } from "../../app/character/characterSlice";
import { useAppDispatch } from "../../utils/redux";
import Layout from "../Layout";
import Loader from "../shared/layout/Loader";
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
          creatures: character.creatures,
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
    </Layout>
  );
}
