import createString from "../../utils/generateUniqueStr";
import { PrismaClient } from "@prisma/client";
import { getUser } from '../userService/getUser';

const prisma = new PrismaClient();

export const checkIsExistToken = async (userId: number) => {
  try {
    
    const user = await getUser(userId);

    if(!user.isSuccess) {
      return {
        isSuccess: false,
        message: "User not found"
      }
    }

    if(!user.data.apiKey) {
      return {
        isSuccess: false,
        message: "User not have token"
      }
    }

    return {
      isSuccess: true,
      message: "User have token"
    }
  } catch {
    return {
      isSuccess: false,
      message: "Error on checking token",
    }
  }
}

export const compareToken = async (userId: number, token : string) => {
  try {
    //TODO : unwrap payload from jwt token and compare with userId
    const user = await getUser(userId);

    if(!user.isSuccess) {
      return {
        isSuccess: false,
        message: "User not found"
      }
    }

    if(!user.data.apiKey) {
      return {
        isSuccess: false,
        message: "User not have token"
      }
    }

    if(!token === user.data.apiKey) {
      return {
        isSuccess: false,
        message: "apiKey not match"
      }
    }

    return {
      isSuccess: true,
      message: "Token Correct"
    }
  } catch {
    return {
      isSuccess: false,
      message: "Error on checking token",
    }
  }
}
