import React from "react";
import s from "./users.module.css";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    followingProgress: Array<number>
    follow: (userid: number) => void
    unfollow: (userid: number) => void
    users: UserType
}



const User: React.FC<PropsType> = (props) => {
    return <div>
            <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + props.users.id}>
                        <img
                            src={props.users.photos.small != null ? props.users.photos.small : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDp76sKVHzoHDo37d3Adq6g5HLC7sVs7Zj_ugJKTh-qi9VRH5x&usqp=CAU"}
                            className={s.usersPhoto}/>
                        </NavLink>
                    </div>
                     <div>
                         {props.users.followed
                             ? <button disabled={props.followingProgress.some(e => e === props.users.id)}
                                       onClick={() => {props.unfollow(props.users.id)}}>Unfollow</button>
                             : <button disabled={props.followingProgress.some(e => e === props.users.id)}
                                       onClick={() => {props.follow(props.users.id)}}>Follow</button>}
                     </div>
                </span>
            <span>
                    <span>
                        <div> {props.users.name}</div>
                        <div>{props.users.status}</div>
                    </span>
                    <span>
                            <div>{"props.users.location.city"}</div>
                        <div>{"props.users.location.country"}</div>
                    </span>
                </span>
        </div>
    </div>
}


export default User
