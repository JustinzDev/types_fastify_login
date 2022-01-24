import { FastifyRequest } from 'fastify'
import Users from '../models/users'
import customError from '../utils/custom_error'
import AuthError from '../errors/auth'

export const handleUserMe = async (request: FastifyRequest) => {
    const { userID } = request

    if(!userID) return customError(AuthError.AuthJWTError)

    const user = await Users.getUserByID(userID)

    return user
}

export default {
    handleUserMe
}