import React from 'react';
import {withFormik, Formik, FormikProps, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import classes from './LoginForm.module.css'

/**
 * Created by Doa on 18-10-2019.
 */

const handleSubmit = (values, { props, setSubmitting}) => {
    props.save(values);
    setSubmitting(false);
    return;
};

const formSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Please enter a email address'),
    password: Yup.string()
        .required('Please enter a password')
        .min(6)
        .matches(/.*[0-9]/, 'password must contain a number'),
});

const formikEnhancer = withFormik(

    {
        mapPropsToValues: props => (
            {
                email: props.email,
                password: props.password
            }),
        validationSchema: formSchema,
        handleSubmit: handleSubmit,
        displayName: 'RegisterOrUpdateUser'
    }
);

const loginForm = (props) => {

    return (
        <div>
            <Form>
                <ul className={classes.wrapper}>
                    <li className={classes.formRow}>

                        <label>Email</label>
                        <Field
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            className={classes.textBox}
                        />
                    </li>
                    <ErrorMessage name="email"
                                  render={msg => <span className={classes.errorMessage}>{msg}</span>}/>

                    <li className={classes.formRow}>

                        <label>Password</label>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={classes.textBox}
                        />
                    </li>
                    <ErrorMessage name="password"
                                  render={msg => <span className={classes.errorMessage}>{msg}</span>}/>
                    <li className={classes.formRow}>
                        <button
                            type="submit">
                            Sign in
                        </button>
                    </li>
                </ul>
            </Form>
        </div>);
};

export default formikEnhancer(loginForm);