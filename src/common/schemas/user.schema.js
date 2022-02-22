import * as yup from 'yup';
import PropertiesSchema from './properties.schema';
import { ValidationMessages } from '..';

const { CONFIRM_PASSWORD_MISMATCH_ERROR, FIELD_MISSING_ERROR } = ValidationMessages;

const UserAccountFormSchema = yup.object().shape({
    first_name: PropertiesSchema.FIRST_NAME,
    last_name: PropertiesSchema.LAST_NAME
});

const EmailChangeFormSchema = yup.object().shape({
    email: PropertiesSchema.EMAIL,
    password: yup
        .string()
        .required(FIELD_MISSING_ERROR)
});

const PasswordChangeFormSchema = yup.object().shape({
    current_password: yup
        .string()
        .required(FIELD_MISSING_ERROR),
    new_password: PropertiesSchema.PASSWORD,
    confirm_password: yup
        .string()
        .oneOf([yup.ref('new_password')], CONFIRM_PASSWORD_MISMATCH_ERROR)
        .required(FIELD_MISSING_ERROR)
});

export {
    UserAccountFormSchema,
    EmailChangeFormSchema,
    PasswordChangeFormSchema
};