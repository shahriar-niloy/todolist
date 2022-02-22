import validationConstants from "./validation.constants"

export default {
    FIELD_MISSING_ERROR: 'This field must not be empty',
    INVALID_EMAIL_ERROR: 'This field must a valid email address',
    MIN_PASSWORD_LENGTH_ERROR: `This field must be at least ${validationConstants.MIN_PASSWORD_LENGTH} characters long`,
    MAX_PASSWORD_LENGTH_ERROR: `This field must be at most ${validationConstants.MAX_PASSWORD_LENGTH} characters long`,
    CONFIRM_PASSWORD_MISMATCH_ERROR: 'Passwords must match',
    MIN_PROJECT_NAME_LENGTH_ERROR: `This field must be at least ${validationConstants.MIN_PROJECT_NAME_LENGTH} characters long`,
    MAX_PROJECT_NAME_LENGTH_ERROR: `This field must be at most ${validationConstants.MAX_PROJECT_NAME_LENGTH} characters long`,
    MIN_TASK_NAME_LENGTH_ERROR: `This field must be at least ${validationConstants.MIN_TASK_NAME_LENGTH} characters long`,
    MAX_TASK_NAME_LENGTH_ERROR: `This field must be at most ${validationConstants.MAX_TASK_NAME_LENGTH} characters long`,
    MIN_TASK_DESCRIPTION_LENGTH_ERROR: `This field must be at least ${validationConstants.MIN_TASK_DESCRIPTION_LENGTH} characters long`,
    MAX_TASK_DESCRIPTION_LENGTH_ERROR: `This field must be at most ${validationConstants.MAX_TASK_DESCRIPTION_LENGTH} characters long`,
    MIN_COMMENT_LENGTH_ERROR: `This field must be at least ${validationConstants.MIN_COMMENT_LENGTH} characters long`,
    MAX_COMMENT_LENGTH_ERROR: `This field must be at most ${validationConstants.MAX_COMMENT_LENGTH} characters long`
}