import {ApiService} from "./api-service";


export function SignIn(payload: { name?: string, email: string }) {
    return ApiService.post(`login`, payload)
}

export function SignUp(payload: { name?: string, email: string }) {
    return ApiService.post(`signup`, payload)
}
export function ConfirmCode(payload:{code:string,sessionID:string}){
    return ApiService.post('confirm-code',payload)
}
