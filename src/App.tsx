import React, {Suspense} from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspence} from "./hoc/withSuspence";
import store, {AppStateType} from "./redux/redux-store";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializeApp: () => void
}

const SuspendDialogs = withSuspence(DialogsContainer)
const SuspendProfile = withSuspence(ProfileContainer)

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }


        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Nav/>
                <div className="app-wrapper-content">
                    {/*<Route path="/dialogs" render={() => <DialogsContainer/>}/>*/}
                    <Route exact path="/" render={()=> <Redirect to='/profile'/>}/>
                    <Route path="/dialogs" render={() => <SuspendDialogs/>}/>
                    <Route path="/profile/:userId?" render={() => <SuspendProfile/>}/>
                    <Route path="/users" render={() => <UsersContainer pageTitle={"Самик"}/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)


const AppWithRouters: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>

}


export default AppWithRouters



