import { useParams } from "next/navigation";
import { useRouter } from "next/router";
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

  const {
    data: character,
    isFetching,
    error,
  } = useGetCharacterQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (character) {
      dispatch(
        setLiveCharacter({
          id: character.id ?? "",
          liveStats: character.liveStats,
          name: character.name,
          creatures: character.creatures ?? [],
          isOwner: character.isOwner,
        })
      );
    }
  }, [character, dispatch]);

  // Handle errors (private character or not found)
  useEffect(() => {
    if (error) {
      router.push("/");
    }
  }, [error, router]);

  if (isFetching) return <Loader />;

  if (!character) {
    return <Loader />;
  }

  return (
    <Layout>
      <CharacterHeader id={id} />
      <CharacterTabs />
    </Layout>
  );
}
