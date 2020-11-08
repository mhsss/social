import axios from "axios"
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials:true,
    headers:{"API-KEY":"2d441c90-aff7-4581-b2ef-bc2f9f149c7e"}
})

export enum ResultCodeEnum {
    success= 0,
    error = 1
}
export enum ResultCodeCaptchaEnum {
    captchaIsRequired = 10
}

export type GetUsersItems = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}