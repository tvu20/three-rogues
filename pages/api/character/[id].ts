import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

// GET /api/character/[id]
export default async function handle(req, res) {
  const id = req.query.id;
  console.log("id", id);
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403);
  } else {
    const character = await prisma.character.findUnique({
      where: {
        id: id,
        author: { email: session.user.email },
      },
      include: {
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
    res.status(200).json(character);
  }
}
