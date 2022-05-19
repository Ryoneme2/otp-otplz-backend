import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

export const getUser = async (id: number | string) => {

  try {
    if (typeof id === 'string') id = parseInt(id);

    const allUsers = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (!!allUsers) {
      return {
        isSuccess: true,
        data: {
          id: allUsers.id,
          name: allUsers.name,
          email: allUsers.email,
          username: allUsers.username,
          role: allUsers.role,
          createdAt: allUsers.createdAt,
        },
        message: 'User has been found'
      }
    }
    return {
      isSuccess: false,
      data: null,
      message: 'user not found'
    }
  } catch (error) {
    return {
      isSuccess: false,
      data: null,
      message: 'Error on find user'
    }
  }


}

export const getListUser = async () => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      }
    })
    if (!!allUsers) {
      return {
        isSuccess: true,
        data: allUsers,
        message: 'List of user has been found'
      }
    }
    return {
      isSuccess: false,
      data: null,
      message: 'List of user not found'
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      data: null,
      message: 'Error on find user'
    }
  }

}

export const getUserByUsername = async (username: string) => {
  try {
    const allUsers = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (!!allUsers) {
      return {
        isSuccess: true,
        data: {
          id: allUsers.id,
          name: allUsers.name,
          email: allUsers.email,
          username: allUsers.username,
          password: allUsers.password,
          apiKey: allUsers.apiKey,
          apiKeyCreateTime: allUsers.apiKeyCreateTime,
          role: allUsers.role,
          createdAt: allUsers.createdAt,
        },
        message: 'User has been found'
      }
    }
    return {
      isSuccess: false,
      data: null,
      message: 'user not found'
    }
  } catch (error) {
    return {
      isSuccess: false,
      data: null,
      message: 'Error on find user'
    }
  }
}