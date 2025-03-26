import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CharacterDetailsForm from "../../components/forms/details-form/CharacterDetailsForm";
import Layout from "../../components/Layout";
import Loader from "../../components/shared/layout/Loader";
const CreatePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loader />;

  if (!session) {
    router.push("/");
  }

  return (
    <Layout>
      <div className="page">
        <CharacterDetailsForm />
      </div>
    </Layout>
  );
};

export default CreatePage;
