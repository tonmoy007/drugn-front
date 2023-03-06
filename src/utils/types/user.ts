export interface User {
    id?: number,
    name?: string;
    username?: string;
    accountName?: string;
    email?: string;
    accessToken?: string;
    avatar?: string;
    loggedIn: boolean;
    wallet?:string;
    new?: boolean;
}

export type AnyUser = { [Property in keyof User]?: User[Property] }