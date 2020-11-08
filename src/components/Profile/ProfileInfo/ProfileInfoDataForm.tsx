import React from 'react';
import s from './ProfileInfo.module.css';
import style from '../../common/FormControls/FormControls.module.css';
import {Form, InjectedFormProps, reduxForm} from "redux-form";
import {Contact} from "./ProfileInfo";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {ProfileType} from "../../../types/types";

type PropsType=  {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType,PropsType> & PropsType>  = (props) => {

    return  <form onSubmit={props.handleSubmit} >
       <div><button>Save</button></div>

        {
            props.error&&<div className={style.formSummaryError}>
                {props.error}
            </div>
        }

        <div>
            <b>Full name</b> : {createField("Full name","fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job</b> : {createField("","lookingForAJob", [], Input, {type:"checkbox"})}
        </div>
        <div>
            <b>My professional skills</b> :
            {createField("Skills","lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me</b> :
            {createField("About me","aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b> : {Object.keys(props.profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b> {key} : {createField(key,"contacts." + key, [], Input)} </b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm<ProfileType,PropsType>({form:"editProfile"})(ProfileDataForm)

export default ProfileDataReduxForm
