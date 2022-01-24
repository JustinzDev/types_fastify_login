import { Custom_ErrorParams } from '../utils/custom_error'

export const AuthInvalidUsername: Custom_ErrorParams = {
    message: 'Unauthorized',
    code: 'AUTH001',
    statusCode: 401
}

export const AuthInvalidPassword: Custom_ErrorParams = {
    message: 'Unauthorized',
    code: 'AUTH002',
    statusCode: 401
}

export const AuthMissingHeaders: Custom_ErrorParams = {
    message: 'Unauthorized',
    code: 'AUTH003',
    statusCode: 401
}

export const AuthJWTError: Custom_ErrorParams = {
    message: 'Unauthorized',
    code: 'AUTH004',
    statusCode: 401
}

export default {
    AuthInvalidUsername,
    AuthInvalidPassword,
    AuthMissingHeaders,
    AuthJWTError
}