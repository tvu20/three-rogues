import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
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
