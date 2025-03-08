import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetCharactersQuery } from "../app/api/apiSlice";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  // will remove this later
  const { data: characters, isLoading } = useGetCharactersQuery();

  if (isLoading) return <div>Loading...</div>;

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

  const renderCharacters = () => {
    return characters?.map((character) => (
      <Link key={character.id} href={`/character/${character.id}`}>
        {character.name} <br />
      </Link>
    ));
  };

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        {renderCharacters()}
      </div>
    </Layout>
  );
};

export default Home;
