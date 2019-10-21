import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import ReactFileStack from 'filestack-react'
import {FILESTACK_SLEUTEL} from '../../kluis'


import RegistrationForm from '../../forms/RegistrationForm/RegistrationForm';
import LoginForm from '../../forms/LoginForm/LoginForm';
import * as actions from '../../store/actions';
import Avatar from '../../components/UI/Avatar/Avatar';


import classes from './Authentication.module.css'

/**
 * Created by Doa on 18-10-2019.
 */
class Authentication extends Component {

    constructor(props) {
        super(props);

        const signIn = (localStorage.getItem('hasAccount')) ? true : false;

        this.state = {
            photoUrl: this.props.photoUrl,
            signIn: signIn,
        }
    }

    ToggleSignInHandler = () => {
        this.setState(prevState => ({
            signIn: !prevState.signIn
        }))
    };

    registrationHandler = (data) => {
        console.log(data);
        this.props.onRegister(data, this.state.photoUrl, false);
    };

    updateHandler = (data) => {
        this.props.onUpdateProfile(this.props.idToken, data, this.state.photoUrl);
    };

    logInHandler = (data) => {
        this.props.onLogin(data)

    };

    pickerOptions = {
        maxFiles: 1,
    };

    pickerDisplayMode = {
        type: 'button',
        customText: 'Choose your own Avatar',
        customClass: ''
    };

    onFilePickerSucces = (result) => {
        console.log(result.filesUploaded[0].url);
        this.setState({
            photoUrl: result.filesUploaded[0].url
        })
    };

    onFilePickerError = (error) => {
        console.error('error', error)
    };

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className={classes.Error}>{this.props.error.message}</p>
            )
        }
        let title = '';
        let form = null;
        let change = null;
        let picker = (
            <div className={classes.Picker}>
                <div className={classes.AvatarHeight}>
                    <Avatar
                        url={this.state.photoUrl}/>
                </div>
                <div className={classes.ReactFileStack}>
                    <ReactFileStack
                        apikey={FILESTACK_SLEUTEL}
                        componentDisplayMode={this.pickerDisplayMode}
                        actionOptions={this.pickerOptions}
                        options={this.basicOptions}
                        onSuccess={this.onFilePickerSucces}
                        onError={this.onFilePickerError}
                    />
                </div>
            </div>
        );

        if (this.props.userId) {
            title = 'Update your profile';
            form = (
                <RegistrationForm
                    name={this.props.name}
                    email=''
                    submit='update'
                    save={this.updateHandler}
                />
            )
        } else if (this.state.signIn) {
            picker = null;
            title = 'Please sign in';
            form = (<LoginForm
                email='example@test.com'
                password='123456'
                save={this.logInHandler}/>);
            change = (
                <p className={classes.Footer}>Don't have an account yet?
                    <u onClick={this.ToggleSignInHandler}>
                        Register now!
                    </u>
                </p>
            )
        } else {
            title = 'Please Register now';
            form = (
                <RegistrationForm
                    name='doa'
                    email='kip@ei.com'
                    submit={'Register Now!'}
                    save={this.registrationHandler}
                />);
            change = (
                <p className={classes.Footer}>Already have an account?
                    <u onClick={this.ToggleSignInHandler}>
                        Sign in
                    </u>
                </p>
            )
        }

        return (
            <>
                <h1 className={classes.Title}>{title}</h1>
                {picker}
                {errorMessage}
                {form}
                {change}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        idToken: state.auth.idToken,
        name: state.auth.name,
        photoUrl: state.auth.photoUrl,
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onRegister: (data, photoUrl) => dispatch(actions.register(data, photoUrl)),
        onUpdateProfile: (idToken, data, photoUrl) => dispatch(actions.updateProfile(idToken, data, photoUrl)),
        onLogin: (data) => dispatch(actions.login((data)))
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(Authentication);