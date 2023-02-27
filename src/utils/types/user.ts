export interface User {
    name?: string;
    username?: string;
    accountName?: string;
    email?: string;
    accessToken?: string;
    avatar?: string;
    loggedIn: boolean;
    wallet?:number;
}

export type AnyUser = { [Property in keyof User]?: User[Property] }