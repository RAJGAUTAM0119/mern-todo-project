import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from '../../config/env.config.ts'
import { IToken } from '../../features/auth/dto/token-generation.dto.ts'
import { StringValue } from 'ms'
import { AppError } from '../errors/AppError.ts'
import { Request } from 'express'


async function createToken(payload: IToken, TOKEN_SECRET: string, TOKEN_EXPIRY: StringValue): Promise<string> {
  const { email, role, userId } = payload

  return await jwt.sign({
    email, role, userId
  },
    TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY }
  )
}

/**
 * Access Token generator function 
 * short lived token to authenticate on the web
 * @param email 
 * @param role 
 * @param userId 
 * @returns access token string
 */
export const generateAccessToken = async (payload: IToken): Promise<string> => {

  return createToken(payload, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_EXPIRY)
}


/**
 * refresh token generator function 
 * help to create new access token
 * @param email 
 * @param role 
 * @param userId 
 * @returns refresh token string
 */
export const generateRefreshToken = async (payload: IToken): Promise<string> => {

  return createToken(payload, env.REFRESH_TOKEN_SECRET, env.REFRESH_TOKEN_EXPIRY)

}


export const verifyAccessToken = (req: Request) => {
  const authorizationHeader = (index: number): string => {
    const value = req.headers.authorization?.split(' ')[index]
    if (!value) {
      throw new AppError(401, "Access Denied")
    }
    return value
  }

  const bearer = authorizationHeader(0)
  if (bearer !== 'Bearer') {
    throw new AppError(401, "No Bearer")
  }

  const accessToken = authorizationHeader(1)


  const decoded: string | JwtPayload = jwt.verify(accessToken as string, env.ACCESS_TOKEN_SECRET)
  return decoded
}