import { getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]";

// POST /api/character/[id]/togglePublic
export default async function handle(req, res) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).json({
      error: "Not authorized",
      message: "You must be signed in to edit this content",
    });
  }

  if (req.method === "POST") {
    try {
      // First, get the current character to check ownership and current state
      const character = await prisma.character.findUnique({
        where: { id: id },
        select: { 
          isPublic: true,
          author: { select: { email: true } }
        },
      });

      if (!character) {
        return res.status(404).json({
          error: "Not found",
          message: "Character not found",
        });
      }

      // Check if user is the owner
      // @ts-ignore
      if (character.author?.email !== session.user.email) {
        return res.status(403).json({
          error: "Not authorized",
          message: "You must be the owner to change visibility",
        });
      }

      // Toggle the isPublic field
      const updatedCharacter = await prisma.character.update({
        where: { id: id },
        data: { isPublic: !character.isPublic },
        select: { id: true, isPublic: true },
      });

      res.status(200).json(updatedCharacter);
    } catch (error) {
      res.status(500).json({ 
        error: "Server error", 
        message: error.message 
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

