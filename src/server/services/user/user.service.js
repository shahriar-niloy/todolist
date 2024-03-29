const path = require('path');
const jwt = require('jsonwebtoken');
const { Op, fn, where, col } = require('sequelize');
const EmailService = require(path.join(process.cwd(), 'src/server/services/email'));
const UserModel = require(path.join(process.cwd(), 'src/server/models/user.model'));
const IconModel = require(path.join(process.cwd(), 'src/server/models/icon.model'));
const ProjectModel = require(path.join(process.cwd(), 'src/server/models/project.model'));
const { escapeWildcards } = require(path.join(process.cwd(), 'src/server/utility/misc'));
const { Return } = require(path.join(process.cwd(), 'src/server/schemas'));
const config = require(path.join(process.cwd(), 'src/server/config/config'));
const { PASSWORD_RESET_TOKEN_EXPIRY_TIMESTRING } = require(path.join(process.cwd(), 'src/server/constants/app.constants'));
const { TEMPLATE_PATHS } = require(path.join(process.cwd(), 'src/server/constants/template.constants'));
const logger = require(path.join(process.cwd(), 'src/server/lib/logger'));
const emailSubjects = require(path.join(process.cwd(), 'src/server/constants/email-subjects.constants'));

async function getUsers() {
    const users = await UserModel.findAll();
    return users; 
}

async function getUser(id) {
    if (!id) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ 
        where: { id }, 
        include: {
            model: ProjectModel,
            include: IconModel
        },
        order: [['projects', 'created_at', 'asc']],
    });

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    return Return.service(user);
}

async function getUserByEmail(email) {
    if (!email) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ 
        where: { email: where(fn('lower', col('email')), fn('lower', email)) }
    });

    if (!user) return Return.service(null, [{ message: 'User with the email does not exist.' }]);

    return Return.service(user);
}

async function createUser(data) {
    if (!data) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const { firstName, lastName, email, password } = data;

    if (!firstName || !lastName || !email || !password) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password
    });

    if (!user) return Return.service(null, [{ message: 'Could not create user.' }]);

    return Return.service(user);
}

async function searchUsers(query, notInProject) {
    if (!query) return [];

    const queryTokens = query.split(' ');

    const escapedQueryTokens = queryTokens.map(token => escapeWildcards(token));

    const where = {
        [Op.or]: escapedQueryTokens
            .reduce((conditions, token) => { 
                conditions.push({ email: { [Op.iLike]: `%${token}%` } });
                conditions.push({ first_name: { [Op.iLike]: `%${token}%` } });
                conditions.push({ last_name: { [Op.iLike]: `%${token}%` } });
                return conditions;
            }, [])
    };

    const projectFilter = {};

    if (notInProject) {
        projectFilter.id = { [Op.not]: notInProject }
    }

    let users = await UserModel.findAll({
        where, 
        include: { model: ProjectModel }
    });
    
    if (notInProject) {
        users = users
            .filter(user => !user.projects
                .find(project => project.id === notInProject)
            );
    }

    return users;
}

async function updateUser(id, data) {
    if (!id) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const [user, userErr] = await getUser(id);

    if (userErr) return Return.service(user, userErr);

    await user.update({ 
        first_name: data.firstName, 
        last_name: data.lastName,
        email: data.email
    });

    return Return.service(user);
}

async function updateUserPassword(id, newPassword) {
    if (!id || !newPassword) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ where: { id } });

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    await user.update({ password: newPassword });

    return Return.service(user);
}

function generatePasswordResetToken(payload) {
    return jwt.sign(payload, config.PASSWORD_RESET_TOKEN_SECRET, { expiresIn: PASSWORD_RESET_TOKEN_EXPIRY_TIMESTRING });
}

async function forgotPassword(email, requestingHost) {
    if (!email) return Return.service(null, [{ message: 'Must provide required parameters.' }]);

    const user = await UserModel.findOne({ 
        where: { email: where(fn('lower', col('email')), fn('lower', email)) }
    });

    if (!user) return Return.service(null);

    const passwordResetToken = generatePasswordResetToken({ id: user.id });

    await user.update({ password_reset_token: passwordResetToken });

    const emailTagReplace = { 
        password_reset_link: `${requestingHost}/reset-password?token=${passwordResetToken}`
    };

    const resetPasswordEmail = new EmailService(
        email, 
        config.APPLICATION_EMAIL, 
        emailSubjects.RESET_PASSWORD, 
        TEMPLATE_PATHS.RESET_PASSWORD, 
        emailTagReplace
    );

    try {
        await resetPasswordEmail.send();
    } catch(err) {
        logger.error(err);
    }

    return Return.service(user);
}

async function resetPassword(token, password) {
    if (!token) return Return.service(null, [{ message: 'Must provide required parameters.' }]);
    
    let payload;

    try {
        payload = jwt.verify(token, config.PASSWORD_RESET_TOKEN_SECRET);
    } catch(err) {
        return Return.service(null, [{ message: err.message }]);
    }

    const user = await UserModel.findOne({ where: { id: payload.id }});

    if (!user) return Return.service(null, [{ message: 'User does not exist.' }]);

    if (!user.isValidPasswordResetToken(token)) return Return.service(null, [{ message: 'Invalid password reset token.' }]);

    await user.update({ password_reset_token: null, password });
    
    return Return.service(user);
}

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.searchUsers = searchUsers;
exports.updateUser = updateUser;
exports.updateUserPassword = updateUserPassword;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;