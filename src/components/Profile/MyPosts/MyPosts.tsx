import React from 'react';
import AddNewPostFormRedux, {AddNewPostFormValuesType} from './Post/AddNewPostForm';
import s from './MyPosts.module.css';
import Posts from './Post/Posts';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/FormControls/FormControls";
import {PostType} from "../../../types/types";

export type MyPostDispatch = {
    onAddPost: (newPost: string) => void
}
export type MyPostState = {
    posts: Array<PostType>
}

type PropsType = MyPostState & MyPostDispatch

const MyPosts: React.FC<PropsType> = (props)=> {

    let postsElements = [...props.posts].reverse().map(p => {
            return (
                <Posts key={p.id} message={p.message} likesCount={p.likesCount}/>
            )
        }
    );

    let onAddPost = (values: AddNewPostFormValuesType) => {
        props.onAddPost(values.NewPostText);
    }


    return (
        <div className={s.postsHeader}>
            <h3>
                My Posts
            </h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}



const MyPostsMemo = React.memo(MyPosts);
// const maxLengthCreator10=maxLengthCreator(10)
// const AddNewPostForm =(props) => {
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <div>
//                 <Field  validate={[required,maxLengthCreator10]} component={Textarea} name={'NewPostText'} placeholder={'text...'} />
//             </div>
//             <div>
//                 <button >Add post</button>
//             </div>
//         </form>
//     )
// }
//
// const AddNewPostFormRedux = reduxForm ({form:"ProfileAddNewPostForm"})(AddNewPostForm)

export default MyPostsMemo;


