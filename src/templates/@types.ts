import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'

export interface ReturnEncodeType {
  hash: string;
  salt: number;
}

export interface UserInterface {
  id?: number;
  email: string;
  name: string;
  username: string;
  password?: string;
  saltPassword?: string;
  apiKey?: string;
  apiKeyCreateTime?: Date;
  bankAccount?: string;
  LastUpdate?: Date;
  role?: string;
  planTier?: number;
  createdAt?: Date;
}

export interface UserJwtPayload {
  id: number;
  email: string;
  username: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user?: string | JwtPayload
}