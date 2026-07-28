import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from '../../config/env.config.ts'
import { IToken } from '../../features/auth/dto/token-generation.dto.ts'
import { StringValue } from 'ms'
import { tokenPayload } from '../middleware/protect.ts'


function createToken(payload: IToken, TOKEN_SECRET: string, TOKEN_EXPIRY: StringValue): string {
  const { email, role, userId } = payload

  return jwt.sign({
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


export const verifyAccessToken = (accessToken: string): tokenPayload => {

  return jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET) as tokenPayload
}

export const verifyRefreshToken = (refreshToken: string): tokenPayload => {

  return jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as tokenPayload
}