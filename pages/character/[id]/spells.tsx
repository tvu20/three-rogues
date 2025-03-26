import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import CharacterSpellsForm from "../../../components/forms/spells-form/CharacterSpellsForm";
import Layout from "../../../components/Layout";
import Loader from "../../../components/shared/layout/Loader";
import { useAppDispatch } from "../../../utils/redux";

const CharacterSpells = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (status === "loading" || !character) return <Loader />;

  if (!session) {
    router.push("/");
  }

  if (!character.spells || character.spells === undefined) {
    dispatch(
      setSnackbar({
        message: "An error occurred while loading spells.",
        severity: "error",
      })
    );
    router.push(`/character/${id}`);
  }

  return (
    <Layout>
      <div className="page">
        <CharacterSpellsForm
          id={id}
          spells={character.spells!}
          name={character.name}
        />
      </div>
    </Layout>
  );
};

export default CharacterSpells;
