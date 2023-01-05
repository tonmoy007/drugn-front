export interface User {
    name?: string;
    email?: string;
    token?: string;
    avatar?: string;
    loggedIn:boolean
}
export type AnyUser = { [Property in keyof User]?:User[Property] }