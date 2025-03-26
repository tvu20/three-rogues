import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useGetCharacterQuery } from "../../app/api/apiSlice";
import CharacterDetailsForm from "../../components/forms/details-form/CharacterDetailsForm";
import Layout from "../../components/Layout";
import Loader from "../../components/shared/layout/Loader";
const EditPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: character } = useGetCharacterQuery(id, {
    skip: !id,
  });

  if (status === "loading" || !character) return <Loader />;

  if (!session) {
    router.push("/");
  }

  return (
    <Layout>
      <div className="page">
        <CharacterDetailsForm character={{ ...character }} />
      </div>
    </Layout>
  );
};

export default EditPage;
