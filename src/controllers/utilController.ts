import { Response } from "express";
import { IGetUserAuthInfoRequest, UserJwtPayload } from '../templates/@types'
import { addUserService } from "../services/userService/addUser";
import { getUser, getListUser, getUserByUsername } from "../services/userService/getUser";
import { httpStatus } from "../configs/httpStatus";
import { generateTokenService } from "services/tokenService/generateToken";
import dotenv from 'dotenv'
import { join } from "path";
dotenv.config()

export const generateToken = async (req: IGetUserAuthInfoRequest, res: Response) => {
  if(!req.user) {
    return {
      status : httpStatus.forbidden,
      data : null,
      message : 'Access denied.'
    }
  }

  const userObjJWT : UserJwtPayload = JSON.parse(req.user.toString())

  const userData = await getUserByUsername(userObjJWT.username)

  if(!userData.isSuccess) {
    return {
      status : httpStatus.InternalServerError,
      data : null,
      message : userData.message
    }
  }

  if(userData.data?.apiKey) {
    return {
      status : httpStatus.badRequest,
      data : null,
      message : 'apiKey has been created'
    }
  }
  if(!userData.data?.id ) {
    return {
      status : httpStatus.badRequest,
      data : null,
      message : 'UserId is undefined'
    }
  }

  const response = await generateTokenService(userData.data?.id)

  if(!response.isSuccess) {
    return {
      status : httpStatus.InternalServerError,
      data : null,
      message : response.message
    }
  }

  return {
    status : httpStatus.ok,
    data : null,
    message : response.message
  }

}

//revoke token , refresh token 