import React from 'react';
import {withFormik, Formik, FormikProps, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import classes from './RegistrationForm.module.css'

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
    name: Yup.string()
        .required('Please enter your full name'),
    password: Yup.string()
        .required('Please enter a password')
        .min(6)
        // .matches(/.*[a-z]/, 'password must contain a lowercase character')
        .matches(/.*[0-9]/, 'password must contain a number'),
    passwordConfirmation: Yup.string()
        .required('Please confirm your password by retyping it')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const formikEnhancer = withFormik(

    {
        mapPropsToValues: props => (
            {
                name: props.name,
                email: props.email,
                gender: '',
                password: '',
                passwordConfirmation: ''
            }),
        validationSchema: formSchema,
        handleSubmit: handleSubmit,
        displayName: 'RegisterOrUpdateUser'
    }
);

const registrationForm = (props) => {

    return (
        <div>
            <Form>
                <ul className={classes.wrapper}>
                    <li className={classes.formRow}>
                        <label>Full name</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className={classes.textBox}
                        />
                    </li>
                    <ErrorMessage name="name"
                                  render={msg => <span className={classes.errorMessage}>{msg}</span>}/>
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

                        <label>Confirm password</label>
                        <Field
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Retype Password"
                            className={classes.textBox}
                        />
                    </li>
                    <ErrorMessage name="passwordConfirmation"
                                  render={msg => <span className={classes.errorMessage}>{msg}</span>}/>

                    <li className={classes.formRow}>
                        <label>Gender</label>
                        <Field
                            className={classes.selectionBox}
                            name="gender"
                            component="select"
                            placeholder="Your Gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </Field>
                    </li>
                    <ErrorMessage
                        name="gender"
                        render={msg => <span className={classes.errorMessage}>{msg}</span>}/>


                    <li className={classes.formRow}>
                        <button
                            type="submit">
                            {props.submit}
                        </button>
                    </li>
                </ul>
            </Form>
        </div>);
};

export default formikEnhancer(registrationForm);