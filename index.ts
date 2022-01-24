import { FastifyServerOptions } from 'fastify'
import mongoose from 'mongoose'
import buildApp from "./src/app"
import config from './src/config'

const options: FastifyServerOptions = {
    logger: true
}
const app = buildApp(options)

mongoose.connect(config.mongodb.uri)

mongoose.connection.on('error', (error) => app.log.error(error))
mongoose.connection.once('open', () => app.log.info('MongoDb has been connected'))

app.listen(config.port)