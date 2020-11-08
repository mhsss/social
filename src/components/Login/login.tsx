import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from '../common/FormControls/FormControls.module.css'
import {AppStateType} from "../../redux/redux-store";


type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps> & LoginFormOwnProps> = (props) => {

  return  (
        <form onSubmit={props.handleSubmit}>

                {createField("email","email",[required],Input)}
                {/*<Field validate={[required]} component={Input} name={'email'} placeholder="email"/>*/}

            <div>
                <Field validate={[required]} component={Input} type={'password'} name={'password'} placeholder="Password"/>
            </div>
            <div> 
                <Field component={Input} name={'rememberMe'} type={"checkbox"}/> remember me
            </div>

            {props.captchaUrl && <img src={props.captchaUrl} /> }
            {props.captchaUrl && createField("type symbols","captcha",[required],Input) }


            {props.error&&<div className={s.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>

        </form>
    )
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)


type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean,captcha: string) => void
}

type LoginType = MapDispatchPropsType & MapStatePropsType

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha:string
}

const Login: React.FC<LoginType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'profile/'} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth:state.userAuth.isAuth,
    captchaUrl:state.userAuth.captchaUrl
})


export default connect (mapStateToProps,{login})(Login)
