import React from 'react';
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {MyPostDispatch, MyPostState} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MyPostState,MyPostDispatch,{},AppStateType> (mapStateToProps,
    {onAddPost:actions.addPostActionCreator})(MyPosts)


export default MyPostsContainer;