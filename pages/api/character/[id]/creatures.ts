import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

// PUT /api/character/[id]/creatures
export default async function handle(req, res) {
  const id = req.query.id;
  const { creatures } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({
      error: "Not authorized",
      message: "You must be signed in to view this content",
    });
  }

  const character = await prisma.character.update({
    where: {
      id: id,
      // @ts-ignore
      author: { email: session.user.email },
    },
    data: {
      creatures: {
        deleteMany: {
          characterId: id,
          NOT: {
            id: { in: creatures.map((c) => c.id ?? "") },
          },
        },
        upsert: creatures.map((creature) => ({
          where: { id: creature.id ?? "" },
          update: {
            ...creature,
          },
          create: creature,
        })),
      },
    },
  });

  res.status(200).json(character);
}
