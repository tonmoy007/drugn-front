export interface User {
    name?: string;
    accountName?:string;
    email?: string;
    accessToken?: string;
    avatar?: string;
    loggedIn:boolean
}
export type AnyUser = { [Property in keyof User]?:User[Property] }