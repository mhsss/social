import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string

}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        status: this.props.status,
        editMode: false
    }
    actvEditMode = () => {
        this.setState(
            {editMode: true}
        )
    }
    deActvEditMode = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType , prevState: StateType) {
        if (prevProps !== this.props) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div>
                {/*{this.state.editMode */}
                {/*    ? <div><span>{this.props.status}</span></div>*/}
                {/*    : <div><span><input value={this.props.status}/></span></div>*/}
                {/*}*/}

                {!this.state.editMode && <div>
                    <span onDoubleClick={this.actvEditMode}>{this.props.status}</span></div>}
                {this.state.editMode && <div>
                    <input onChange={this.onStatusChange} onBlur={this.deActvEditMode} value={this.state.status}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;