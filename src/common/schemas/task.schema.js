import * as yup from 'yup';
import PropertiesSchema from './properties.schema';
import { ValidationMessages } from '..';

const { CONFIRM_PASSWORD_MISMATCH_ERROR, FIELD_MISSING_ERROR } = ValidationMessages;

const TaskFormSchema = yup.object().shape({
    name: PropertiesSchema.TASK_NAME,
    description: PropertiesSchema.TASK_DESCRIPTION
});

export {
    TaskFormSchema
};