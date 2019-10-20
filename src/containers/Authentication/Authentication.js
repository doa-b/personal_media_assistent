import React, {Component} from 'react';

import RegistrationForm from '../../forms/RegistrationForm/RegistrationForm';
import LoginForm from '../../forms/LoginForm/LoginForm';
import * as actions from '../../store/actions';
import connect from 'react-redux/es/connect/connect';

import classes from './Authentication.module.css'

/**
 * Created by Doa on 18-10-2019.
 */
class Authentication extends Component {

    constructor(props) {
        super(props);

        const signIn = (localStorage.getItem('hasAccount'))? true : false

        this.state = {
            photoUrl: 'http://URLtest',
            signIn: signIn
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


    render() {
        let title = '';
        let form = null;
        let change = null;

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
            title = 'Please sign in';
            form = (<LoginForm
                email='example@test.com'
                password='123456'
                save={this.logInHandler}/>);
            change = (
                <p className={classes.Footer}>Don't have an account yet?
                    <button
                        onClick={this.ToggleSignInHandler}>
                        Register
                    </button>
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
                    <button
                        onClick={this.ToggleSignInHandler}>
                        Log in
                    </button>
                </p>
            )
        }

        return (
            <>
                <h1 className={classes.Title}>{title}</h1>
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
        onRegister: (data, photoUrl, isUpdate) => dispatch(actions.register(data, photoUrl)),
        onUpdateProfile: (idToken, data, photoUrl) => dispatch(actions.updateProfile(idToken, data, photoUrl)),
        onLogin: (data) => dispatch(actions.login((data)))
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(Authentication);