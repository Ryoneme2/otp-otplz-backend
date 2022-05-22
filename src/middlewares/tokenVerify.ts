import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from '../templates/@types'
import dotenv from 'dotenv'
dotenv.config()

import { checkIsExistToken, compareToken } from '../services/tokenService/checkIsExistToken'

export const tokenVerify = (req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) => {
  try {
    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    
    console.log('auth middleware request');
    const token = req.header("Authorization");

    if (!token) return res.status(403).send({
      isLogin : false,
      errMsg : 'Access denied.'
    });

    console.log(process.env.JWT_SECRET);
    
    const decoded  = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!checkIsExistToken(decoded.id)) {
      return res.status(403).send({
        isLogin : false,
        errMsg : 'token is not exist'
      });
    }

    next();
} catch (error) {
    res.status(400).send("Invalid token");
}
}