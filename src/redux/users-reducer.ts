import {PhotosType, UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWING_PROGRESS = 'FOLLOWING_PROGRESS';


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 20,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            };


        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            };

        case SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_USERS_COUNT: {
            return {...state, totalItemsCount: action.count};
        }
        case IS_FETCHING: {
            return {...state, isFetching: action.fetch};
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        //     {
        //     let stateCopy = {...state};
        //     stateCopy.currentPage = {...state.currentPage};
        //     stateCopy.currentPage = action.currentPage;
        //     return stateCopy;
        // }


        case FOLLOWING_PROGRESS: {
            return {
                ...state = state, followingProgress: action.fetch
                    ? [...state.followingProgress, action.id]
                    : state.followingProgress.filter(e => e != action.id)
            }
        }
        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>

export const actions ={
    followSuccsessful: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowSuccsessful: (userId: number) => ({type: UNFOLLOW, userId} as const),
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const,
    setTotalUsersCount: (totalCount: number) => ({
        type: SET_USERS_COUNT,
        count: totalCount
    } as const),
    Fetching: (fetch: boolean) => ({type: IS_FETCHING, fetch} as const),
    followingToggle: (fetch: boolean, id: number) => ({
        type: FOLLOWING_PROGRESS,
        fetch,
        id
    } as const)
}

export const requestUsersThunkCreator = (pageSize: number, page: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.Fetching(true))
        dispatch(actions.setCurrentPage(page))
        const data = await usersAPI.getUsers(pageSize, page)
        dispatch(actions.Fetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

export const onPageChangeThunkCreator = (pageNumber: number, pageSize: number) : ThunkType=> {
    return async (dispatch: any) => {
        dispatch(actions.Fetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        const data = await usersAPI.getUsers(pageSize, pageNumber)
        dispatch(actions.Fetching(false));
        dispatch(actions.setUsers(data.items));
    }
}
// export const onPageChangeThunkCreator = (pageNumber: number, pageSize: number) => {
//     return (dispatch: any) => {
//         dispatch(Fetching(true));
//         dispatch(setCurrentPage(pageNumber));
//         usersAPI.getUsers(pageSize,pageNumber)
//             .then(data => {
//                 dispatch(Fetching(false));
//                 dispatch(setUsers(data.items));
//             });
//     }
// }


// export const follow = (userId) => {
//     return async (dispatch) => {
//         dispatch(followingToggle(true, userId));
//        let response = await usersAPI.follow(userId)
//                 if (response.data.resultCode == 0) {
//                     dispatch(followSuccsessful(userId))
//                 }
//                 dispatch(followingToggle(false, userId));
//     }
// }
// export const unfollow = (userId) => {
//     return (dispatch) => {
//         dispatch(followingToggle(true, userId));
//         usersAPI.unfollow(userId)
//             .then(response => {
//                 if (response.data.resultCode == 0) {
//                     dispatch(unfollowSuccsessful(userId))
//                 }
//                 dispatch(followingToggle(false, userId));
//             });
//     }
// }


const _followUnfollowFlow = async (userId: number, dispatch: Dispatch<ActionsType>, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.followingToggle(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.followingToggle(false, userId));

}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(usersAPI), actions.followSuccsessful)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        let actionCreator = actions.unfollowSuccsessful
        _followUnfollowFlow(userId, dispatch, apiMethod, actionCreator)
    }
}


export default usersReducer