import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// GET /api/character/[id]
export default async function handle(req, res) {
  const id = req.query.id;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({
      error: "Not authorized",
      message: "You must be signed in to view this content",
    });
  } else {
    const character = await prisma.character.findUnique({
      where: {
        id: id,
        // @ts-ignore
        author: { email: session.user.email },
      },
      include: {
        features: true,
        weapons: true,
        spells: true,

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
    };

    res.status(200).json(combinedCharacter);
  }
}
