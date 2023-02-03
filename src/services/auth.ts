const API_URL = process.env.API_URL || 'http://18.183.175.32:8080'

export function SignIn(payload: { name?: string, email: string }) {
    return fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {"Content-Type": "application/json"}
    }).then(res => res.json())
}

export function SignUp(payload: { name?: string, email: string }) {
    return fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    }).then(res => res.json())
}
export function ConfirmCode(payload:{code:string}){
    return fetch(`${API_URL}/confirm-code`,{method:"POST",
        headers: {"Content-Type": "application/json"},body:JSON.stringify(payload)}).then(res=>res.json())
}
