import jwt from 'jsonwebtoken'
import { env } from '../../config/env.config.ts'
import { IToken } from '../../features/auth/dto/tokenGeneration.dto.ts'
import { StringValue } from 'ms'
import { TokenPayload } from '../types/jwt.type.ts'
import { AppError } from '../errors/AppError.ts'


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


export const verifyAccessToken = (accessToken: string): TokenPayload => {
  try {
    const payload = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)
    if (typeof payload === 'string') {
      throw new AppError(401, "Invalid access token")
    }
    return payload as TokenPayload
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, "Invalid or expired access token")
    }
    throw error
  }
}

export const verifyRefreshToken = (refreshToken: string): TokenPayload => {
  try {
    const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET)
    if (typeof payload === 'string') {
      throw new AppError(401, "Invalid refresh token")
    }
    return payload as TokenPayload
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, "Invalid or expired refresh token")
    }
    throw error
  }
}