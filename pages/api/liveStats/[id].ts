import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  const { id } = req.query;
  const { trackedFeatures, liveStats } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).json({
      error: "Not authorized",
      message: "You must be signed in to view this content",
    });
  }

  if (trackedFeatures) {
    trackedFeatures.map(async (feature) => {
      await prisma.feature.update({
        where: {
          id: feature.id,
          characterId: id,
        },
        data: {
          used: feature.used,
        },
      });
    });
  }

  const character = await prisma.character.update({
    where: {
      id: id,
      // @ts-ignore
      author: { email: session.user.email },
    },
    // @ts-ignore
    data: { liveStats: liveStats },
  });

  res.status(200).json(character);
}
