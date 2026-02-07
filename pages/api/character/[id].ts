import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  const id = req.query.id;
  const session = await getServerSession(req, res, authOptions);

  // GET /api/character/[id]
  if (req.method === "GET") {
    // First fetch the character to check if it exists and if it's public
    const character = await prisma.character.findUnique({
      where: { id: id },
      include: {
        features: true,
        weapons: true,
        spells: true,
        inventory: true,
        creatures: true,
        author: {
          select: { name: true, email: true },
        },
      },
    });

    if (!character) {
      return res.status(404).json({
        error: "Not found",
        message: "Character not found",
      });
    }

    // Check if user has permission to view
    // @ts-ignore
    const isOwner = session?.user?.email === character.author?.email;
    const canView = character.isPublic || isOwner;

    if (!canView) {
      return res.status(403).json({
        error: "Not authorized",
        message: "This character is private",
      });
    }

    const trackedFeatures = character?.features
      ?.filter((feature) => feature.tracked)
      .sort((a, b) => a.name.localeCompare(b.name));

    const combinedCharacter = {
      ...character,
      liveStats: {
        // @ts-ignore
        ...(character?.liveStats || {}),
        trackedFeatures,
      },
      isOwner, // Add ownership flag
    };

    res.status(200).json(combinedCharacter);

    // PUT /api/character/[id]
  } else if (req.method === "PUT") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { features, isOwner, ...characterData } = req.body;
    const character = await prisma.character.update({
      where: {
        id: id,
        // @ts-ignore
        author: { email: session.user.email },
      },
      data: {
        ...characterData,
        features: {
          deleteMany: {
            characterId: id,
            NOT: {
              id: { in: features.map((f) => f.id ?? "") },
            },
          },
          upsert: features.map((feature) => ({
            where: { id: feature.id ?? "" },
            update: {
              ...feature,
            },
            create: feature,
          })),
        },
      },
    });

    res.status(200).json(character);

    // DELETE /api/character/:id
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await prisma.character.delete({
      where: { id: id as string },
    });

    // delete all related fields in other tables
    await prisma.feature.deleteMany({
      where: { characterId: null },
    });

    await prisma.weapon.deleteMany({
      where: { characterId: null },
    });

    await prisma.spell.deleteMany({
      where: { characterId: null },
    });

    await prisma.item.deleteMany({
      where: { characterId: null },
    });

    await prisma.creature.deleteMany({
      where: { characterId: null },
    });

    res.status(200).json({ message: "Character deleted" });
  }
}
