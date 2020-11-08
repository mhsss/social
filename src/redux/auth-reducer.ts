import { ResultCodeEnum, ResultCodeCaptchaEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'

// export type InitialStateType = {
//     id: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
//     captcha: string | null
//     captchaUrl: string | null
// }

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha:null as string | null,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes):InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actionsAuth>

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const actionsAuth = {
    setUserData : (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({type: SET_USER_DATA, data: {id, email, login, isAuth}} as const),
    setCaptchaUrl : (captchaUrl: string) => ({type: SET_CAPTCHA_URL, data: {captchaUrl}} as const)
}



export const getUserData = () : ThunkType  => async (dispatch) => {
        const meData = await authAPI.me()
        if (meData.resultCode === ResultCodeEnum.success) {
            let {id, email, login} = meData.data;
            dispatch(actionsAuth.setUserData(id, email, login, true));
        }

}
export const login = (email: string, password: string, rememberMe: boolean,captcha: string) : ThunkType => async (dispatch)   => {
    const loginData = await authAPI.login(email, password, rememberMe,captcha)
    if (loginData.resultCode === ResultCodeCaptchaEnum.captchaIsRequired) {
        dispatch(getUserData())
    } else {
        if (loginData.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        const message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = () : ThunkType  => {
    return async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(actionsAuth.setCaptchaUrl(captchaUrl))
    }
}

export const logout = () : ThunkType  => {
    return async (dispatch) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(actionsAuth.setUserData(null, null, null, false))
        }

    }
}

export default authReducer;