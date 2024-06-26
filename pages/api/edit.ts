import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

import { NextApiRequest, NextApiResponse } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "PATCH") {
    return res.status(405).end();
  }

  try {
    const { name, username, bio, profileImage, coverImage, UserId } = req.body;

    if (!name || !username) {
      throw new Error("Missing Fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: UserId,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
