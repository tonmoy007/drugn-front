export type AccountPayLoad={
    userId:number;
}
export type AccountResponse={
    message:string;
    privateKey: string,
    address: string,
    base64Qr: any
    error?:string;
}
export type UserDataPayLoad={
    userId: number;
}
export type UserDataResponse={
    id:number;
    is_initial_nft:boolean;
    account_name?:string;
    address?: string;
}
export type InitialNFTPayLoad={
    user: number;
    address: string;
}
export type InitialNFTResponse={
    message:string;
    error?:string;
}
export type BalancePayLoad={
    address: string;
}
export type BalanceResponse={
    message?:string;
    amount:number
    error?:string;
}