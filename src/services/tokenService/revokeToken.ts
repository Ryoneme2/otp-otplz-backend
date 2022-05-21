import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const revokeTokenService = async (userId: number) => {
  try {
    const res = await prisma.user.delete({
      where: {
        id: userId,
      }
    })

    return {
      isSuccess: true,
      data: null,
      message: "Token has been revoked"
    }
  } catch {
    return {
      isSuccess: false,
      data: null,
      message: "Error on revoke token",
    }
  }
}
