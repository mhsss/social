import {InferActionsTypes} from "./redux-store";

const SEND_MESSAGE = 'SN/DIALOGS/SEND_MESSAGE';

type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Vovan"},
        {id: 2, name: "Ania"},
        {id: 3, name: "Tolik"},
        {id: 4, name: "Yura"},
        {id: 5, name: "Vika"},
        {id: 6, name: "Veronika"}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hello"},
        {id: 3, message: "Yo"},
        {id: 4, message: "Priv"},
        {id: 5, message: "Kuku"},
        {id: 6, message: "MidOne"}
    ] as Array<MessagesType>
}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: action.newMessageBody}]
            }

        default:
            return state;
    }
}

export const actions = {
    sendMessage : (newMessageBody: string) => ({type: SEND_MESSAGE,newMessageBody} as const)
}

type ActionsType = InferActionsTypes<typeof actions>


export default dialogsReducer;


