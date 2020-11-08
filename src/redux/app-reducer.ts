import {getUserData} from "./auth-reducer";

const SET_INITIALIZED = 'SN/APP/SET_INITIALIZED';


let initialState = {
  initialized : false
};
export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_INITIALIZED: {
            return {...state,
                initialized: true
            }
        }
        default:
            return state
    }
};

export const actions = {
    initializationSuccessed : () => ({type: SET_INITIALIZED})

}

export const initializeApp = () => {
    return (dispatch:any) => {
    let promise = dispatch(getUserData())
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializationSuccessed())
    })
}}

export default appReducer;