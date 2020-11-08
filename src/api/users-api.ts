import {GetUsersItems, instance, APIResponseType} from "./api"
import {profileAPI} from "./profile-api"



export const usersAPI = {
    getUsers(pageSize = 5, currentPage = 1) {

        return instance.get<GetUsersItems>(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
    },
    getProfile(userId: number) {
        return profileAPI.getProfile(userId)
    }
}