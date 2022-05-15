import bcrypt from 'bcryptjs';
import { ReturnEncodeType } from '../templates/@types';

export const hashString = async (str: string): Promise<ReturnEncodeType> => {
  const SALT_ROUNDS = Math.random() * 5;
  const hash = await bcrypt.hash(str, SALT_ROUNDS);
  return {
    hash,
    salt: SALT_ROUNDS
  };
}

export const decodePassword = (str: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(str, hash);
}