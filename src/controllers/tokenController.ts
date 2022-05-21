import { revokeToken } from './tokenController';
import { Response } from "express";
import { IGetUserAuthInfoRequest, UserJwtPayload } from '../templates/@types'
import { getUserByUsername } from "../services/userService/getUser";
import { httpStatus } from "../configs/httpStatus";
import { generateTokenService, revokeToken } from "../services/tokenService/generateToken";
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = async (req: IGetUserAuthInfoRequest, res: Response) => {
  if(!req.user) {
    res.send({
      status : httpStatus.forbidden,
      data : null,
      message : 'Access denied.'
    })
    return
  }

  const userObjJWT = req.user as UserJwtPayload;

  console.log({ userObjJWT });

  const userData = await getUserByUsername(userObjJWT.username)

  console.log({ userData });

  if(!userData.isSuccess) {
    res.send({
      status : httpStatus.InternalServerError,
      data : null,
      message : userData.message
    })
    return
  }

  if(userData.data?.apiKey) {
    res.send({
      status : httpStatus.badRequest,
      data : null,
      message : 'apiKey has been created'
    })
    return
  }

  if(!userData.data?.id) {
    res.send({
      status : httpStatus.badRequest,
      data : null,
      message : 'UserId is undefined'
    })
    return
  }

  const response = await generateTokenService(userData.data?.id)

  console.log({ response });
  
  if(!response.isSuccess) {
    res.send({
      status : httpStatus.InternalServerError,
      data : null,
      message : response.message
    })
  }

  res.send({
    status : httpStatus.created,
    data : null,
    message : response.message
  })

}

export const revokeToken = async (req : IGetUserAuthInfoRequest, res : Response) => {
  if(!req.user) {
    res.send({
      status : httpStatus.forbidden,
      data : null,
      message : 'Access denied.'
    })
    return
  }

  const userObjJWT = req.user as UserJwtPayload;

  const userData = await getUserByUsername(userObjJWT.username)

  if(!userData.isSuccess) {
    res.send({
      status : httpStatus.InternalServerError,
      data : null,
      message : userData.message
    })
    return
  }

  if(!userData.data?.apiKey) {
    res.send({
      status : httpStatus.badRequest,
      data : null,
      message : 'token already revoked'
    })
    return
  }

  if(!userData.data?.id) {
    res.send({
      status : httpStatus.badRequest,
      data : null,
      message : 'UserId is undefined'
    })
    return
  }

  const response = await revokeTokenService(userData.data?.id)

  if(!response.isSuccess) {
    res.send({
      status : httpStatus.InternalServerError,
      data : null,
      message : response.message
    })
  }

  res.send({
    status : httpStatus.created,
    data : null,
    message : response.message
  })
}