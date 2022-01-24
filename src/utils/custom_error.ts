export class Custom_Error extends Error {
    code?: string
    statusCode?: number
    data?: object

    constructor (message: string, code?: string, statusCode: number = 500, data?: object){
        super(message)

        this.name = 'Custom_Error'
        this.message = message
        this.code = code
        this.statusCode = statusCode
        this.data = data
    }
}

export type Custom_ErrorParams = {
    message: string
    code?: string
    statusCode: number
    data?: object
}

const customError = ({
    message, 
    code, 
    statusCode, 
    data}
: Custom_ErrorParams) => {
    throw new Custom_Error(
        message, 
        code, 
        statusCode,
        data
    )
}

export default customError