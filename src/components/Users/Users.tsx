import React from "react";
import Paginator from "../common/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type UsersPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (PageNumber: number) => void
    portionSize?: number
    users: Array<UserType>
    followingProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<UsersPropsType> = ({currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props}) => {

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    // let pages = [];
    //
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i);
    // }

    return <div>
        {/*<div>*/}
        {/*    {pages.map(p => {*/}
        {/*        return <span onClick={() => {*/}
        {/*            props.onPageChanged(p)*/}
        {/*        }} className={props.currentPage === p && s.selectedPage}>{p}</span>*/}
        {/*    })}*/}
        {/*</div>*/}

        <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize}
                   onPageChanged={onPageChanged} currentPage={currentPage}/>
        {users.map(u => <User key={u.id}
                              users={u}
                              followingProgress={props.followingProgress}
                              unfollow={props.unfollow} follow={props.follow}/>
            //     <div key={u.id}>
            //         <span>
            //             <div>
            //                 <NavLink to={'/profile/' + u.id}>
            //                 <img
            //                     src={u.photos.small != null ? u.photos.small : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDp76sKVHzoHDo37d3Adq6g5HLC7sVs7Zj_ugJKTh-qi9VRH5x&usqp=CAU"}
            //                     className={s.usersPhoto}/>
            //                 </NavLink>
            //             </div>
            //              <div>
            //                  {u.followed
            //                      ? <button disabled={props.followingProgress.some(e => e === u.id)}
            //                                onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
            //                      : <button disabled={props.followingProgress.some(e => e === u.id)}
            //                                onClick={() => {props.follow(u.id)}}>Follow</button>}
            //              </div>
            //         </span>
            //     <span>
            //             <span>
            //                 <div> {u.name}</div>
            //                 <div>{u.status}</div>
            //             </span>
            //             <span>
            //                     <div>{"u.location.city"}</div>
            //                 <div>{"u.location.country"}</div>
            //             </span>
            //         </span>
            // </div>
        )}
    </div>
}



export default Users
