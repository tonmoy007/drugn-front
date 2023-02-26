export type AuthPayload={
    username?:string;
    email:string;
}
export type AuthResponse={
    message:string;
    sessionID:string;
    error?:string;
}
export type ConfirmCodePayload={
    sessionID:string
    code:string
}