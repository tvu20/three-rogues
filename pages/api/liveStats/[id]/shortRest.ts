import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handle(req, res) {
  const { id } = req.query;
  const { liveStats } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).json({
      error: "Not authorized",
      message: "You must be signed in to view this content",
    });
  }

  try {
    // First get all features that need to be updated
    const features = await prisma.feature.findMany({
      where: {
        characterId: id,
        resetsOn: "short",
        tracked: true,
      },
    });

    // Then update each feature
    await Promise.all(
      features.map((feature) =>
        prisma.feature.update({
          where: { id: feature.id },
          data: { used: 0 },
        })
      )
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  const character = await prisma.character.update({
    where: {
      id: id,
      // @ts-ignore
      author: { email: session.user.email },
    },
    data: { liveStats: liveStats },
  });

  res.status(200).json(character);
}
