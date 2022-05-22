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

export interface UserJwtPayload extends JwtPayload {
  id: number;
  email: string;
  username: string;
}

export interface ApiKeyJwtPayload extends JwtPayload {
  apiKey: string;
  apiKeyCreateTime: Date;
  id: number;
  planTier: number,
}

export interface IGetUserAuthInfoRequest extends Request {
  user?: string | JwtPayload
}