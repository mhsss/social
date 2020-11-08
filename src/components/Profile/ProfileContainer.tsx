import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (text: string) => void
    savePhoto:(file: File) => void
    saveProfile:(profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}
type WithRouterPropsType = RouteComponentProps<PathParamsType>
type PropsType = StatePropsType & DispatchPropsType & WithRouterPropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile () {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId =  this.props.authorizedUserId
            if (!userId){
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId as number)
        this.props.getUserStatus(userId as number)
    }



    componentDidMount() {
        this.refreshProfile()

        // old
        // usersAPI.getProfile(userId)
        //     .then(response => {
        //         this.props.setUserProfile(response.data);
        //     });
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {

        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile()
        }

    }


    render() {

        return (
            <Profile profile ={this.props.profile}
                     status ={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status :state.profilePage.status,
    authorizedUserId:state.userAuth.id,
    isAuth:state.userAuth.isAuth
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile,getUserStatus,updateUserStatus,savePhoto,saveProfile}),
    // withAuthRedirect,
    withRouter)(ProfileContainer)





