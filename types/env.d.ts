declare module '@env' {
    export const API_URL: string;
}
declare namespace NodeJS {
    export interface ProcessEnv {
        API_URL: string
    }
}