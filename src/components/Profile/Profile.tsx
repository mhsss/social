import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
    isOwner: boolean
    updateUserStatus: (status: string) => void
    status: string
    profile: ProfileType | null

}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner ={props.isOwner}
                         updateUserStatus={props.updateUserStatus} status ={props.status} profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile