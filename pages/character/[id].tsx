import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import CharacterHeader from "../../components/character/header/CharacterHeader";
import { useParams } from "next/navigation";
import { useGetCharacterQuery } from "../../app/api/apiSlice";
import { useAppDispatch } from "../../utils/redux";
import { setLiveCharacter } from "../../app/character/characterSlice";
import Loader from "../../components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CharacterPage from "../../components/character/CharacterPage";

export default function Character() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") return <Loader />;

  if (!session) {
    router.push("/");
  }

  return <CharacterPage />;
}
