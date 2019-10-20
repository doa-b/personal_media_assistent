import React, {Component} from 'react';
import {withFormik, Formik, FormikProps, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import classes from './AdvancedAuthentication.module.css'

/**
 * Created by Doa on 17-10-2019.
 */
class AdvancedAuthentication extends Component {

    state = {
      login: true
    };

    initialValues = {
        first_name: '',
        email: '',
        gender: '',
        password: '',
        passwordConfirmation: ''
    };

    handleSubmit = (values, {props = this.props, setSubmitting}) => {


        //process form submission here
        alert(JSON.stringify(values, null, 2));
        //done submitting, set submitting to false
        setSubmitting(false);
        return;

    };
    //Validation with Yup
    formSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Please enter a email address'),
        name: Yup.string()
            .required('Please enter your full name'),
        password: Yup.string()
            .required('Please enter a password')
            .min(6)
            .matches(/.*[a-z]/, 'password must contain a lowercase character' )
            .matches(/.*[0-9]/, 'password must contain a number'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

   formikEnhancer = withFormik(
       {
           mapPropsToValues: props => (this.initialValues),
           validationSchema: this.formSchema,
           handleSubmit: this.handleSubmit,
           displayName: 'RegisterOrUpdateUser'
       }
   );

   form = (
       <div>
           <Form>
               <ul className={classes.wrapper}>
                   <li className={classes.formRow}>
                       <label>Full Name</label>
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
                       </Field>
                   </li>
                   <ErrorMessage
                       name="gender"
                       render={msg => <span className={classes.errorMessage}>{msg}</span>}/>


                   <li className={classes.formRow}>
                       <button
                           type="submit"
                           disabled={this.props.isSubmitting}>
                           Submit Form
                       </button>
                   </li>
               </ul>
           </Form>
       </div>
   );



    render() {
        let name = null;
        if(this.state.login) {
            name = (
               <>
                <li className={classes.formRow}>
                    <label>Full Name</label>
                    <Field
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className={classes.textBox}
                    />
                </li>
                <ErrorMessage name="name"
            render={msg => <span className={classes.errorMessage}>{msg}</span>}/>
                   </>
            )
        }

        const initialValues = {
            first_name: '',
            email: '',
            gender: '',
            password: '',
            passwordConfirmation: ''
        };

        return (
            <Formik
                initialValues={initialValues}
                validationSchema={this.formSchema}
                onSubmit={this.handleSubmit}
                render={formProps => {
                    console.log(formProps);
                    return (
                        <div>
                            <Form>
                                <ul className={classes.wrapper}>
                                    {name}

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
                                        </Field>
                                    </li>
                                    <ErrorMessage
                                        name="gender"
                                        render={msg => <span className={classes.errorMessage}>{msg}</span>}/>


                                    <li className={classes.formRow}>
                                        <button
                                            type="submit"
                                            disabled={formProps.isSubmitting}>
                                            Submit Form
                                        </button>
                                    </li>
                                </ul>
                            </Form>
                        </div>
                    );
                }}
            />);

    }
}

export default AdvancedAuthentication;

