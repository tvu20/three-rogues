import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import CharacterCreaturesForm from "../../../components/forms/creatures-form/CharacterCreaturesForm";
import Layout from "../../../components/Layout";
import Loader from "../../../components/shared/layout/Loader";
import { useAppDispatch } from "../../../utils/redux";

const CharacterCreatures = () => {
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

  if (!character.creatures || character.creatures === undefined) {
    dispatch(
      setSnackbar({
        message: "An error occurred while loading creatures.",
        severity: "error",
      })
    );
    router.push(`/character/${id}`);
  }

  return (
    <Layout>
      <div className="page">
        <CharacterCreaturesForm
          id={id}
          creatures={character.creatures!}
          name={character.name}
        />
      </div>
    </Layout>
  );
};

export default CharacterCreatures;
