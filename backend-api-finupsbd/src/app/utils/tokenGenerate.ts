import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { ConfigFile } from '../../config';

export const accessTokenGenerate = (
  payload: JwtPayload,
  expiresIn: jwt.SignOptions['expiresIn'],
): string => {
  return jwt.sign(
    payload as string | Buffer | object,
    ConfigFile.JWT_ACCESS_SECRET as jwt.Secret,
    { expiresIn } as jwt.SignOptions,
  );
};

export const refreshTokenGenerate = (
  payload: JwtPayload,
  expiresIn: jwt.SignOptions['expiresIn'],
): string => {
  return jwt.sign(
    payload as string | Buffer | object,
    ConfigFile.JWT_REFRESH_SECRET as jwt.Secret,
    { expiresIn } as jwt.SignOptions,
  );
};
