export interface User {
    name?: string;
    id?: any,
    username?: string;
    accountName?: string;
    email?: string;
    accessToken?: string;
    avatar?: string;
    loggedIn: boolean;
    wallet?:string;
}

export type AnyUser = { [Property in keyof User]?: User[Property] }