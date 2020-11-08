import React from 'react';
import s from './Nav.module.css'
import {NavLink, Route} from "react-router-dom";


const Nav: React.FC = () => {
    return <nav className={s.nav}>
        <ul>
            <li><NavLink to="/profile" activeClassName={s.active}>Profile</NavLink></li>

            <li><NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink></li>

            <li><NavLink to="/users" activeClassName={s.active}>Users</NavLink></li>

            <li><a href="!#">News</a></li>

            <li><a href="!#">Music</a></li>

            <li> <a href="!#">Settings</a></li>
        </ul>
    </nav>
}

export default Nav;