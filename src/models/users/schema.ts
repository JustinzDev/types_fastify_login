import { Schema, Document, model } from 'mongoose'
import { UsersSchema } from '../../types/models/users'
const collection = 'Users'

export interface UsersSchemaWithDocument extends UsersSchema, Document {

}

const userSchema = new Schema<UsersSchemaWithDocument>({
    username: {
        type: 'string',
        unique: true,
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    firstname: {
        type: 'string'
    },
    lastname: {
        type: 'string'
    }
}, {
    collection,
    versionKey: false,
    timestamps: true
})

export default model(collection, userSchema)