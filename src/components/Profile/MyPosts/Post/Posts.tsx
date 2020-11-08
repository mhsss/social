import React from 'react';
import s from './Posts.module.css';

type PropsType = {
    message: string
    likesCount: number
}

const Posts:React.FC<PropsType> = (props) => {
    return (

        <div className={s.item}>
            {props.message}
            {props.likesCount}
        </div>

    )
}

export default Posts;