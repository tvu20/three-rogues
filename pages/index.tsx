import { useSession } from "next-auth/react";
import React from "react";
import CharacterList from "../components/homepage/CharacterList";
import Layout from "../components/Layout";
import Loader from "../components/shared/layout/Loader";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;

  return (
    <Layout>
      <div className="page">
        {session && <CharacterList />}
        {!session && <div>Unauthenticated!</div>}
      </div>
    </Layout>
  );
};

export default Home;
