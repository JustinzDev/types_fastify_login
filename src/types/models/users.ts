export interface UsersSchema{
    username: string,
    password: string,
    email: string,
    firstname?: string | null,
    lastname?: string | null
}