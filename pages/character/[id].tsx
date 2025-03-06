import React, { useEffect, useState } from "react";
import prisma from "../../lib/prisma";
import { getSession, useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import CharacterHeader from "../../components/character/CharacterHeader";
import { useRouter, useParams } from "next/navigation";

export default function Character() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const { data: session, status } = useSession();
  const [character, setCharacter] = useState({});
  useEffect(() => {
    if (status === "loading") return;

    const userHasValidSession = Boolean(session);

    // // handle differently here
    if (!userHasValidSession) {
      router.push("/");
    }

    fetch(`/api/character/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "access-control-allow-origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      })
      .catch((error) => console.error(error));
  }, [status, id]);
  console.log("Character data:", JSON.stringify(character, null, 2));

  // if (!character) {
  //   return <div>Character not found</div>;
  // }

  return (
    <Layout>
      <CharacterHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Character Details</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(character, null, 2)}
        </pre>
      </div>
    </Layout>
  );
}
