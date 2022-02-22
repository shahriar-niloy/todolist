import * as yup from 'yup';
import PropertiesSchema from './properties.schema';

const ProjectFormSchema = yup.object().shape({
    name: PropertiesSchema.PROJECT_NAME
});

export {
    ProjectFormSchema
};