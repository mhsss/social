import React from "react"
import s from "./FormControls.module.css"
import {Field, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../utils/validators"

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <textarea {...input} {...props}/>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>

        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <input {...input} {...props}/>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const createField = (placeholder: string | undefined, name: string, validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>, props = {}, text = "") => (
    <div>
        <Field placeholder={placeholder} name={name} validate={validators}
               component={component} {...props}
        /> {text}
    </div>
)