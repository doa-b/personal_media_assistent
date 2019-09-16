import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import classes from './Authentication.module.css'

import Name from '../../components/UI/Input/Name'
import Email from '../../components/UI/Input/Email'
import Password from '../../components/UI/Input/Password'
import * as constants from '../../shared/constants'
import * as actions from '../../store/actions/index'
import { updateObject } from "../../shared/utility";

/**
 * Created by Doa on 11-9-2019.
 */
class Authentication extends Component {

    state = {
        formData: {
            name: 'Doa',
            email: 'djdoa@hotmail.com',
            password: '123456',
            photoUrl: 'https://images1.persgroep.net/rcs/Lv_LIy7x1aZbGNHgwU46vnEznhc/diocontent/100818159/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.9'
        },
        operation: constants.AUTH_SIGN_IN
    };

    switchAuthModeHandler = (operation) => {
        this.setState(updateObject(this.state, {operation: operation}))
    };

    changeHandler = (event, controlName) => {
        const updatedForm = updateObject(this.state.formData,
            {[controlName]: event.target.value});
        this.setState({formData: updatedForm});
    };

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.onAuth(this.state.formData.email,
            this.state.formData.password,
            this.state.operation)
        this.props.onTvdbAuth();
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
                );
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
                <button onClick={this.props.onSeries}>
                    get series test
                </button>
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
        onAuth: (email, password, operation, name, photoUrl) =>
            dispatch(actions.auth(email, password, operation, name, photoUrl)),
        onTvdbAuth: () => dispatch(actions.loginTvdb()),
        onSeries: () => dispatch(actions.getSeriesDetails())
    }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Authentication);