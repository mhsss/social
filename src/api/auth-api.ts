import {instance, APIResponseType, ResultCodeCaptchaEnum, ResultCodeEnum} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(resp => resp.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType,ResultCodeEnum | ResultCodeCaptchaEnum>>('/auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(resp => resp.data)
    },
    logout() {
        return instance.delete('/auth/login')
    }
}