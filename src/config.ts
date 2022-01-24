import dotenv from 'dotenv'

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGO_URI || 'mongodb://localhost/login-register'
    },
    secret:{
        accessToken: process.env.SECRET_ACCESS_TOKEN || ''
    }
}

export default config