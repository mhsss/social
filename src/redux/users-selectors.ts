import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

const getUserSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUserSelector,(users) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUserCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingProgress = (state: AppStateType) => {
    return state.usersPage.followingProgress
}