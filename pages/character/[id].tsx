import React, { useState } from "react";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ params, req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const email = session?.user.email || "";

  const character = await prisma.character.findUnique({
    where: {
      id: params?.id,
      author: { email: session.user.email },
    },
    include: {
      //   ingredients: true,
      //   tags: true,
      author: {
        select: { name: true, email: true },
      },
      //   comments: {
      //     where: { author: { is: { email: email } } },
      //     include: {
      //       author: {
      //         select: { email: true },
      //       },
      //     },
      //   },
    },
  });

  return {
    props: {
      character: JSON.parse(JSON.stringify(character)),
    },
  };
};

export default function Character({ character }) {
  console.log("Character data:", JSON.stringify(character, null, 2));

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Character Details</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(character, null, 2)}
      </pre>
    </div>
  );
}
