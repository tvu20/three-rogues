import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  const { id } = req.query;
  const { liveStats } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(403);
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
