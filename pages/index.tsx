import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetCharactersQuery } from "../app/api/apiSlice";
import CharacterList from "../components/homepage/CharacterList";
import Loader from "../components/Loader";
const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;

  // useEffect(() => {
  //   if (status === "loading") return;
  //   // const userHasValidSession = Boolean(session);
  //   console.log("SESSION", session);

  //   fetch(`/api/characters`, {
  //     method: "GET",
  //     mode: "cors",
  //     headers: {
  //       "access-control-allow-origin": "*",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       // setRecipes(data);
  //     })
  //     .catch((error) => console.error(error));
  // }, [session]);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        {session && <CharacterList />}
        {!session && <div>Unauthenticated!</div>}
      </div>
    </Layout>
  );
};

export default Home;
