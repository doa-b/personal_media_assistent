import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import classes from './Authentication.module.css'

import Name from '../../components/UI/Input/Name'
import Email from '../../components/UI/Input/Email'
import Password from '../../components/UI/Input/Password'
import * as constants from '../../shared/constants'
import * as actions from '../../store/actions/index'

/**
 * Created by Doa on 11-9-2019.
 */
class Authentication extends Component {

    state = {
        formData: {
            name: 'Doa',
            email: 'djdoa@hotmail.com',
            password: '123456'
        },
        operation: constants.AUTH_SIGN_IN
    };

    switchAuthModeHandler = (operation) => {
        this.setState({...this.state, operation: operation})
    };

    changeHandler = (event, controlName) => {
        console.log(event.target.value);
        this.setState({...this.state, formdata: {[controlName]: event.target.value}})
    };

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.onAuth(this.state.formData.email,
            this.state.formData.password,
            this.state.operation)
    };

    render() {

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className={classes.Error}>{this.props.error.message}</p>
            )
        }

        let header = '';
        let footer = null;
        switch (this.state.operation) {
            case constants.AUTH_SIGN_UP: {
                header = 'Sign up';
                footer = (
                    <p> Already have an account? <button
                        onClick={() => this.switchAuthModeHandler(constants.AUTH_SIGN_IN)}>
                        Sign in
                    </button></p>);
                break
            }
            case constants.AUTH_CHANGE_INFO: {
                header = 'Change account info';
                footer = (
                    <p>Forgot password? <Link to={'/newpassword'}>Get new password</Link></p>
                )
                break
            }
            default : {
                header = 'Sign in';
                footer = (<p className={classes.footer}> Don't have an account yet? <button
                    onClick={() => this.switchAuthModeHandler(constants.AUTH_SIGN_UP)}>
                    Sign up
                </button></p>);
            }
        }

        let details = null;
        if (this.state.operation !== constants.AUTH_SIGN_IN) {
            details = <Name
                value={this.state.formData.name}
                changed={(event) => this.changeHandler(event, 'name')}/>
        }

        return (
            <div className={classes.Authentication}>
                <h2> {header} </h2>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {details}
                    <Email
                        value={this.state.formData.email}
                        changed={(event) => this.changeHandler(event, 'email')}/>
                    <Password
                        value={this.state.formData.password}
                        changed={(event) => this.changeHandler(event, 'password')}/>
                    <button type='submit'>
                        Submit
                    </button>
                </form>
                {footer}
            </div>);

    }
}

const mapStatetoProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onAuth: (email, password, operation) =>
            dispatch(actions.auth(email, password, operation))
    }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Authentication);