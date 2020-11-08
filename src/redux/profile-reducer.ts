import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersAPI} from "../api/users-api";
import {profileAPI} from "../api/profile-api";
import {ResultCodeEnum} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_POST = 'DELETE_POST '

let initialState = {
    posts: [
        {id: 1, message: "Hi,how are you", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 13},
        {id: 3, message: "Yo", likesCount: 13},
        {id: 4, message: "Priv", likesCount: 13},
        {id: 5, message: "Kuku", likesCount: 13},
        {id: 6, message: "MidOne", likesCount: 13}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST : {
            let newPost = {
                id: 7,
                message: action.newPost,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case SET_USER_PROFILE : {
            return {...state, profile: action.profile}
        }

        // case DELETE_POST : {
        //     return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        // }

        case SAVE_PHOTO_SUCCESS : {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }

        default:
            return state;

    }
}

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>

export const actions = {
    addPostActionCreator : (newPost: string) => ({type: ADD_POST, newPost}as const),
    setUserProfile : (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}as const),
    setUserStatus : (status: string) => ({type: SET_USER_STATUS, status}as const),
    savePhotoSuccess : (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos}as const)
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await usersAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data));

}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setUserStatus(data));
}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data= await profileAPI.updateStatus(status)

        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    } catch (error) {
    }
}

export const savePhoto = (photos: File): ThunkType => async (dispatch) => {
        let response = await profileAPI.savePhoto(photos)
        if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos));
        }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().userAuth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if(userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('user id cant be null')
        }
    } else {
        dispatch(stopSubmit("editProfile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}
export default profileReducer;