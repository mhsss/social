import React from 'react';
import Header, {HeaderDispatchPropsType, HeaderStatePropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


class HeaderContainer extends React.Component<HeaderStatePropsType & HeaderDispatchPropsType>   {

        render() {
            return <Header {...this.props}/>
        }
}
        const mapStateToProps = (state: AppStateType) => ({
            isAuth : state.userAuth.isAuth,
            login : state.userAuth.login
        })



export default connect<HeaderStatePropsType,HeaderDispatchPropsType, {}, AppStateType> (mapStateToProps,{logout})(HeaderContainer);