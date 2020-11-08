import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStateType = {
    isAuth: boolean
}
type DispatchType = {

}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStateType & DispatchType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={"/login"}/>

        return <WrappedComponent {...restProps as WCP} />
    }

    let mapStateToPropsForRedirect = (state: AppStateType) => ({
        isAuth: state.userAuth.isAuth
    })

    let ConnectedRedirectComponent = connect<MapStateType,DispatchType,WCP,AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedRedirectComponent
}