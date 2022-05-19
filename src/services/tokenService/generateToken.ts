import createString from "../../utils/generateUniqueStr";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const generateTokenService = async (userId: number) => {
  try {
    const token = createString();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        apiKey: token,
        apiKeyCreateTime: new Date(),
      }
    })

    return {
      isSuccess: true,
      data: null,
      message: "Token has been created"
    }
  } catch {
    return {
      isSuccess: false,
      data: null,
      message: "Error on generate token",
    }
  }
}
