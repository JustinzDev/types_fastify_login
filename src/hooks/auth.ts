import { FastifyRequest } from 'fastify'
import customError from '../utils/custom_error'
import authErrors from '../errors/auth'
import jwt from 'jsonwebtoken'
import config from '../config'
import { AccessTokenDecoded } from '../types/hooks/auth'

const validateHeadersAuth = (request: FastifyRequest): string => {
    const authToken: string | undefined = request.headers['authorization']
    if (!authToken) {
      return customError(authErrors.AuthMissingHeaders)
    }
  
    const accessToken = authToken.split(' ')[1]
    if (!accessToken) {
      customError(authErrors.AuthMissingHeaders)
    }
  
    return accessToken
  }

export const verifyAccessToken = async (request: FastifyRequest): Promise<boolean> => {
    try {
        const accessToken = validateHeadersAuth(request)
        const decoded: AccessTokenDecoded = Object(jwt.verify(accessToken, config.secret.accessToken))

        request.userID = decoded.aud

        return true
    } catch (error) {
        customError(authErrors.AuthJWTError)
        return false
    }
}

export default{
    verifyAccessToken
}