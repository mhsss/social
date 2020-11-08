import React from "react";
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    requestUsersThunkCreator,
    onPageChangeThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingProgress,
    getIsFetching,
    getPageSize,
    getTotalUserCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    pageSize: number
    currentPage: number
    isFetching: boolean
    totalItemsCount: number
    users: Array<UserType>
    followingProgress: Array<number>
}

type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsersThunkCreator: (pageSize: number, currentPage: number) => void
    onPageChangeThunkCreator: (pageNumber: number, pageSize: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {

        // this.props.getUsersThunkCreator(this.props.pageSize,this.props.currentPage)

        let {pageSize, currentPage} = this.props
        this.props.getUsersThunkCreator(pageSize, currentPage)

        // old code :
        // this.props.Fetching(true);
        // usersAPI.getUsers(this.props.pageSize,this.props.currentPage).then(data => {
        //         this.props.Fetching(false);
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //
        //     });
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.onPageChangeThunkCreator(pageNumber, pageSize)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                followingProgress={this.props.followingProgress}
            />
        </>
    }
}


let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}


// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         Fetching: (fetch) => {
//             dispatch(isFetchingAC(fetch))
//         }
//     }
// }


export default connect <MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType> (mapStateToProps,
    {getUsersThunkCreator: requestUsersThunkCreator, unfollow, follow, onPageChangeThunkCreator
})(UsersContainer)