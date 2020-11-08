import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../../../utils/validators"
import {Textarea} from "../../../common/FormControls/FormControls"
import React from "react"


const maxLengthCreator10=maxLengthCreator(10)

export type AddNewPostFormValuesType = {
    NewPostText: string
}
type OwnProps = {

}

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValuesType,OwnProps> & OwnProps>  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
            <Field  validate={[required,maxLengthCreator10]} component={Textarea} name={'NewPostText'} placeholder={'text...'} />
    </div>
    <div>
    <button>Add post</button>
    </div>
    </form>
)
}

export default reduxForm<AddNewPostFormValuesType,OwnProps> ({form:"ProfileAddNewPostForm"})(AddNewPostForm)