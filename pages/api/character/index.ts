import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/character
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({
      error: "Not authorized",
      message: "You must be signed in to view this content",
    });
  }

  const { features, ...characterData } = req.body;
  const character = await prisma.character.create({
    data: {
      ...characterData,
      author: { connect: { email: session?.user?.email } },
      features: {
        create: features,
      },
    },
  });
  res.status(200).json(character);
}
