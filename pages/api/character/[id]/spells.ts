import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

// PUT /api/character/[id]/spells
export default async function handle(req, res) {
  const id = req.query.id;
  const { spells } = req.body;
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
      spells: {
        deleteMany: {
          characterId: id,
          NOT: {
            id: { in: spells.map((s) => s.id ?? "") },
          },
        },
        upsert: spells.map((spell) => ({
          where: { id: spell.id ?? "" },
          update: {
            ...spell,
          },
          create: spell,
        })),
      },
    },
  });

  res.status(200).json(character);
}
