import React from 'react';
import s from './../Dialogs.module.css';

type PropsType = {
    text: string
    id: number
}

const DialogsMessage: React.FC<PropsType> = (props) => {
    return (
        <div className={s.messagesItem}>{props.text}</div>
    )
};



export default DialogsMessage;