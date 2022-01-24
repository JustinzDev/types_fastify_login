import { FastifyRequest } from 'fastify'
import { AuthLoginBodyRequest, AuthRegisterBodyRequest, AuthLoginBodyResponse, AuthRefreshTokenResponse } from '../types/handlers/auth'
import Users from '../models/users'
import { UsersSchemaWithDocument } from '../models/users/schema'
import customError from '../utils/custom_error'
import AuthError from '../errors/auth'

export const handleLogin = async (request: AuthLoginBodyRequest): Promise<AuthLoginBodyResponse> => {
    const { username, password } = request.body

    const user = await Users.userLogin(username, password)
    return user
}

export const handleRegister = async (request: AuthRegisterBodyRequest): Promise<UsersSchemaWithDocument> => {

    const { username, password, email, firstname, lastname } = request.body

    const user = await Users.createNewUser({
        username,
        password,
        email,
        firstname,
        lastname
    })
    return user
}

export const handleReToken = async (request: FastifyRequest): Promise<AuthRefreshTokenResponse> => {
    const { userID } = request

    if(!userID) return customError(AuthError.AuthJWTError)

    const accessToken = Users.AccessToken(userID)
    const response: AuthRefreshTokenResponse = {
        accessToken
    }
    return response
}

export default {
    handleLogin,
    handleRegister,
    handleReToken
}