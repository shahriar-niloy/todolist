import * as yup from 'yup';
import { ValidationMessages } from '..';
import PropertiesSchema from './properties.schema';

const { CONFIRM_PASSWORD_MISMATCH_ERROR, FIELD_MISSING_ERROR } = ValidationMessages;

const LoginSchema = yup.object().shape({
    email: PropertiesSchema.EMAIL,
    password: PropertiesSchema.PASSWORD
});

const SignupSchema = yup.object().shape({
    first_name: PropertiesSchema.FIRST_NAME,
    last_name: PropertiesSchema.LAST_NAME,
    email: PropertiesSchema.EMAIL,
    password: PropertiesSchema.PASSWORD,
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], CONFIRM_PASSWORD_MISMATCH_ERROR)
        .required(FIELD_MISSING_ERROR)
}); 

export {
    LoginSchema,
    SignupSchema
};