import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// GET /api/characters
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).json({
      error: "Not authorized",
      message: "You must be signed in to view this content",
    });
  } else {
    const result = await prisma.character.findMany({
      where: {
        // @ts-ignore
        author: { email: session?.user.email },
      },
      include: {
        author: {
          select: { name: true },
        },
        // tags: true,
      },
    });
    res.status(200).json(result);
  }
}
