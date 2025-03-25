import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useGetCharacterQuery } from "../../../app/api/apiSlice";
import { setSnackbar } from "../../../app/snackbar/snackbarSlice";
import CharacterInventoryForm from "../../../components/forms/inventory-form/CharacterInventoryForm";
import Layout from "../../../components/Layout";
import Loader from "../../../components/shared/layout/Loader";
import { useAppDispatch } from "../../../utils/redux";

const CharacterInventory = () => {
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

  if (!character.weapons || character.weapons === undefined) {
    dispatch(
      setSnackbar({
        message: "An error occurred while loading weapons.",
        severity: "error",
      })
    );
    router.push(`/character/${id}`);
  }

  if (!character.inventory || character.inventory === undefined) {
    dispatch(
      setSnackbar({
        message: "An error occurred while loading inventory.",
        severity: "error",
      })
    );
    router.push(`/character/${id}`);
  }

  return (
    <Layout>
      <div className="page">
        <CharacterInventoryForm
          id={id}
          name={character.name}
          inventory={character.inventory!}
          weapons={character.weapons!}
          currency={character.currency!}
        />
      </div>
    </Layout>
  );
};

export default CharacterInventory;
