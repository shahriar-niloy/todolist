import React from 'react';
import { Formik, Form, Field } from 'formik';

export default function Login({ onSubmit }) {
    return <div>
        <Formik
            initialValues={{ 
                email: '',
                password: ''
            }}
            onSubmit={(values, actions) => {
                onSubmit(values);
            }}
        >
            {props => (
                <Form className="container p-3" onSubmit={props.handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-4 bg-light px-4 py-3">
                            <div class="form-group mt-3">
                                <label for="email">Email</label>
                                <Field type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div class="form-group mt-3">
                                <label for="password">Password</label>
                                <Field type="password" name="password" className="form-control" id="password" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                            <button className="mt-3 btn btn-primary" type="submit">Login</button>
                        </div>
                    </div>
                    
                </Form>
            )}
        </Formik>
    </div>;
}