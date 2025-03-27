import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handle(req, res) {
  const { id } = req.query;
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

  // @ts-ignore - always exists
  const { liveStats, ...rest } = await prisma.character.findUnique({
    where: {
      id: id,
      // @ts-ignore
      author: { email: session.user.email },
    },
  });

  const updatedLiveStats = {
    ...liveStats,
    tempHP: 0,
    hitDice: liveStats.hitDice.map((hitDice) => ({
      ...hitDice,
      current: hitDice.max,
    })),
    currentHP: rest.maxHP,
    conditions: "",
    deathsaves: { successes: 0, failures: 0 },
    spellSlots: Object.fromEntries(
      Object.entries(liveStats.spellSlots).map(
        ([level, slot]: [string, { current: number; max: number }]) => [
          level,
          { ...slot, current: slot.max },
        ]
      )
    ),
    concentration: "",
  };

  const character = await prisma.character.update({
    where: {
      id: id,
      // @ts-ignore
      author: { email: session.user.email },
    },
    data: { liveStats: updatedLiveStats },
  });

  res.status(200).json(character);
}
