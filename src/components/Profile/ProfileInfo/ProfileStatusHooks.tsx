import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusHooks: React.FC<PropsType> = (props) => {


    let [editMode,setEditMode] = useState(false)
    let [status,setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])


    let activateEditMode = () => {
        setEditMode(true)
    }
    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
       setStatus(e.currentTarget.value)
    }
    let deActvEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }





        return (

            <div>

                {/*{this.state.editMode */}
                {/*    ? <div><span>{this.props.status}</span></div>*/}
                {/*    : <div><span><input value={this.props.status}/></span></div>*/}
                {/*}*/}

                { !editMode && <div> <b>status:</b> <span onClick={activateEditMode}> {props.status || '---' }  </span></div>}
                { editMode && <div><input onChange={onStatusChange} autoFocus={true} onBlur={deActvEditMode} value={status} /></div>}
            </div>
        )
    }


export default ProfileStatusHooks;