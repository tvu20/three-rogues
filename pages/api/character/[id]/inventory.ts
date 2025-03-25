import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

// PUT /api/character/[id]/inventory
export default async function handle(req, res) {
  const id = req.query.id;
  const { inventory, weapons, currency } = req.body;
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
      currency: currency,
      weapons: {
        deleteMany: {
          characterId: id,
          NOT: {
            id: { in: weapons.map((w) => w.id ?? "") },
          },
        },
        upsert: weapons.map((weapon) => ({
          where: { id: weapon.id ?? "" },
          update: {
            ...weapon,
          },
          create: weapon,
        })),
      },
      inventory: {
        deleteMany: {
          characterId: id,
          NOT: {
            id: { in: inventory.map((i) => i.id ?? "") },
          },
        },
        upsert: inventory.map((item) => ({
          where: { id: item.id ?? "" },
          update: {
            ...item,
          },
          create: item,
        })),
      },
    },
  });

  res.status(200).json(character);
}
