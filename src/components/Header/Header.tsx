import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export type HeaderStatePropsType ={
    login: string | null
    isAuth: boolean
}
export type HeaderDispatchPropsType = {
    logout: () => void
}

const Header: React.FC<HeaderStatePropsType&HeaderDispatchPropsType> = (props) => {
    return <header className={s.header}>
        <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzWpVKSlohCa88FYucyjGqtWQ7pzAq7VwMrC-xRr-PwBPGRQRf"></img>
        <div className={s.loginLink}>
        { props.isAuth ? <div> {props.login} --- <button onClick={props.logout} >Log out</button> </div>
            : <NavLink to={'/login'} >Login</NavLink>}
        </div>
    </header>
}

export default Header;