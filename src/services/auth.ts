import {ApiService} from "./api-service";


export function SignIn(payload: { name?: string, email: string }) {
    return ApiService.post(`login`, payload).then(res => res.data)
}

export function SignUp(payload: { name?: string, email: string }) {
    return ApiService.post(`signup`, payload).then(res => res.data)
}
export function ConfirmCode(payload:{code:string,sessionID:string}){
    return ApiService.post('confirm-code',payload).then(res=>res.data)
}
