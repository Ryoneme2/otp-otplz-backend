import { getUser } from './../userService/getUser';
import createString from "../../utils/generateUniqueStr";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateTokenService = async (userId: number, planTier: number) => {
  try {
    const token = createString();

    const resUser = getUser(userId);

    const tokenJwt = jwt.sign({
      apiKey: token,
      apiKeyCreateTime: new Date(),
      id: userId,
      planTier: planTier,
    }, "x##A7Nzam1LoIWP90Ubp8c50gi&v7@N8@HcT9TwWXiWfi")

    const res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        apiKey: tokenJwt,
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
