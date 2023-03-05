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