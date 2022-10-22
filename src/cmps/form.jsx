import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';

export const Form = () => {

    const initialValues = { email: '', password: '' }

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (values.password.length < 3) {
            errors.password = 'Invalid password'
        }
        return errors;
    }

    const onFormSubmit = (values, { setSubmitting }) => {
        console.log('values', values);
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }

    const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'secondary'} />

    return (
        <div>
            <h1>Any place in your app!</h1>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onFormSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="email" name="email" label="email" as={TextFieldOutlined} />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" label="password" as={TextFieldOutlined} />
                        <ErrorMessage name="password" component="div" />
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            type="submit"
                            disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

