import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

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
        <Link href="/character/9486cbae-0544-41d0-a941-84a6b2d09cd1">
          Character 1
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
