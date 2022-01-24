import { FastifyInstance } from 'fastify'
import { handleLogin, handleRegister, handleReToken } from '../handlers/auth'
import { verifyAccessToken } from '../hooks/auth'

const authRouters = async (app: FastifyInstance) => {
    app.post('/login', handleLogin)
    app.post('/register', handleRegister)
    app.post('/re_token', {
        preHandler:[
            verifyAccessToken
        ]
    },handleReToken)
}

export default authRouters