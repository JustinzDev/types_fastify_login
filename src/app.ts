import fastify, { FastifyServerOptions } from 'fastify'
import authRouters from './routers/auth'
import userRouters from './routers/user'
import customError, { Custom_Error } from './utils/custom_error'

declare module 'fastify' {
    interface FastifyRequest {
        userID?: string
    }
}

const buildApp = (options: FastifyServerOptions) => {
    const app = fastify(options)

    app.get('/', async (req,res) => {
        res.send('Hello World');
    })

    app.register(authRouters, { prefix: '/auth' })
    app.register(userRouters, { prefix: '/users' })

    app.setErrorHandler((error, request, reply) => {
        const Custom_Error: Custom_Error = error
        reply
            .status(Custom_Error.statusCode || 500)
            .send({
                error: {
                    message: Custom_Error.message,
                    code: Custom_Error.code,
                    data: Custom_Error.data
                }
            })
    })

    return app;
}

export default buildApp