import React from 'react';
import s from './Dialogs.module.css';
import {NavLink, Redirect} from "react-router-dom";
import DialogsMessage from "./MessageItem/DialogsMessage";
import UserItem from "./UserItem/UserItem";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators";
import {initialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: initialStateType
    sendMessage: (text: string) => void
    id: number
}

const  Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(d => <UserItem name={d.name} id={d.id} key={d.id}/>);
    let messageElements = state.messages.map(m => <DialogsMessage text={m.message} id={m.id} key={m.id}/>);


    let addNewMessage = (values: DialogNewMsgFormType ) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsUsers}>
                {dialogsElements}
            </div>
            <div className={s.dialogsMessages}>
                <div>{messageElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
};


const maxLength50 = maxLengthCreator(50)

type DialogNewMsgFormType = {
    newMessageBody: string
}

type PropsFormType ={ }

const AddMessageForm: React.FC<InjectedFormProps<DialogNewMsgFormType,PropsFormType> & PropsFormType>= (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field validate={[required,maxLength50]} component={Textarea} name={'newMessageBody'} placeholder={'text...'}/>
                </div>
                <div><button>Send</button></div>
            </form>
        )
}

const AddMessageFormRedux = reduxForm<DialogNewMsgFormType>({form: 'dialogsAddMessageForm'})(AddMessageForm)




export default Dialogs;