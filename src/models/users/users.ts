import { UsersSchema } from '../../types/models/users'
import { AuthLoginBodyResponse } from '../../types/handlers/auth'
import jwt from 'jsonwebtoken'
import Users, { UsersSchemaWithDocument } from './schema'
import customError from '../../utils/custom_error'
import AuthError from '../../errors/auth'
import config from '../../config'
import bcrypt from 'bcrypt'

const HashPassword = (password : string): string => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    return hashPassword
}

const comparePassword = (password: string, existsPassword: string): boolean => {
    const PasswordCorrect = bcrypt.compareSync(password, existsPassword)
    if(!PasswordCorrect) customError(AuthError.AuthInvalidPassword)
    return true
}

export const AccessToken = (userID: string): string => {
    const token = jwt.sign({}, config.secret.accessToken, {
        expiresIn: 60*5,
        audience: String(userID)
    })
    return token
}

export const createNewUser = async (doc: UsersSchema): Promise<UsersSchemaWithDocument> => {
    doc.password = HashPassword(doc.password)
    const user = new Users(doc)
    return user.save()
}

const mapUserResponseObject = (userID: string, user: UsersSchemaWithDocument, accessToken?: string): AuthLoginBodyResponse => {
    const response: AuthLoginBodyResponse = {
      id: userID,
      username: user.username,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email,
      accessToken
    }
  
    return response
  }

export const userLogin = async (username: string, password: string): Promise<AuthLoginBodyResponse> => {
    const user = await Users.findOne({
        username
    })

    if(!user) return customError({
        ...AuthError.AuthInvalidUsername,
        data: {
            testMode: true
        }
    })
    comparePassword(password, user.password)
    const userId = user._id
    const accessToken = AccessToken(userId)
    const response: AuthLoginBodyResponse = mapUserResponseObject(userId, user, accessToken)
    return response
}

export const getUserByID = async (userID: string): Promise<AuthLoginBodyResponse> => {
    const user = await Users.findById(userID)
    if (!user) return customError(AuthError.AuthJWTError)
    const response: AuthLoginBodyResponse = mapUserResponseObject(userID, user)
    return response
  }

export default {
    createNewUser,
    userLogin,
    getUserByID,
    AccessToken
}