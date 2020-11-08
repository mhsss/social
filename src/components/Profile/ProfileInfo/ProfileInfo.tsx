import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import ProfileDataForm from "./ProfileInfoDataForm";
import ProfileDataReduxForm from "./ProfileInfoDataForm";
import {ProfileType,ContactsType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    savePhoto: (file: File) => void
    saveProfile:(profile: ProfileType) => Promise<any>
    isOwner: boolean
    updateUserStatus: (status: string) => void
    status: string
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    const [editMode,setEditMode] = useState(false)


    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {

      props.saveProfile(formData).then(
          ()=> {
              setEditMode(false)
          }
      )
    }

    return (
        <div>
            <div>
                <img src={props.profile.photos.large || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDp76sKVHzoHDo37d3Adq6g5HLC7sVs7Zj_ugJKTh-qi9VRH5x&usqp=CAU"} />

                {props.isOwner && <input onChange={onMainPhotoSelect} type={'file'} />}

                {editMode ?  <ProfileDataReduxForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/>
                : <ProfileData isOwner={props.isOwner} goToEditMode={()=> setEditMode(true)} profile={props.profile}/>}

                <ProfileStatusHooks updateUserStatus={props.updateUserStatus} status={props.status}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    goToEditMode: ()=> void
    isOwner: boolean

}

export const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
    return <div>
        {props.isOwner && <div><button onClick={props.goToEditMode} >Edit</button></div>}
    <div>
        <b>Full name</b> : {props.profile.fullName}
    </div>
    <div>
        <b>Looking for a job</b> : {props.profile.lookingForAJob ? "yes" : "no"}
    </div>
    <div>
        <b>My professional skills</b> : {props.profile.lookingForAJobDescription}
    </div>
    <div>
        <b>About me</b> : {props.profile.aboutMe }
    </div>
    <div>
        <b>Contacts</b> : {Object.keys(props.profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]} />
    })}
    </div>
    </div>
}

type ContactsPropstype = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactsPropstype> = ({contactTitle,contactValue}) => {
        return <div className={s.contact} >
            <span> {contactTitle} </span> : <b> {contactValue}</b>
        </div>
}


export default ProfileInfo;