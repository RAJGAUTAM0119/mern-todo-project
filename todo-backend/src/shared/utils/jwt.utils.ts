import jwt from 'jsonwebtoken'
import { env } from '../../config/env.config.ts'
import { IToken } from '../../features/auth/dto/token-generation.dto.ts'

/**
 * Access Token generator function 
 * short lived token to authenticate on the web
 * @param email 
 * @param role 
 * @param userId 
 * @returns access token string
 */
export const generateAccessToken = async (payload: IToken): Promise<string> => {
  const { email, role, userId } = payload
  const accessToken = await jwt.sign({
    email, role, userId
  },
    env.ACCESS_TOKEN_SECRET, { expiresIn: env.ACCESS_TOKEN_EXPIRY }
  )
  return accessToken
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
  const { email, role, userId } = payload

  const refreshToken = await jwt.sign({
    email, role, userId
  },
    env.REFRESH_TOKEN_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRY }
  )
  return refreshToken
}