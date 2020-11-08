import {PhotosType, ProfileType} from "../types/types";
import {instance,APIResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {

    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(resp => resp.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(resp => resp.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status}).then(resp => resp.data)
    },
    savePhoto(photos: any) {
        let formData = new FormData()
        formData.append('image', photos)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(resp => resp.data)
    }
}