import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi,how are you", likesCount: 12},
                {id: 2, message: "It's my first post", likesCount: 13},
                {id: 3, message: "Yo"},
                {id: 4, message: "Priv"},
                {id: 5, message: "Kuku"},
                {id: 6, message: "MidOne"}
            ],
            newPostText: 'latatata'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "Hello"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Priv"},
                {id: 5, message: "Kuku"},
                {id: 6, message: "MidOne"}
            ],
            dialogs: [
                {id: 1, name: "Vovan"},
                {id: 2, name: "Ania"},
                {id: 3, name: "Tolik"},
                {id: 4, name: "Yura"},
                {id: 5, name: "Vika"},
                {id: 6, name: "Veronika"}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() {

    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebarPage = sidebarReducer(this._state.profilePage, action);
        this._callSubscriber(this._state);
    }
}



export default store;