const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized('API key incorrecta'));
    }
}

function checkAdminRole(req, res, next) {
    const { role } = req.user;
    if (role === 'admin') {
        next();
    } else {
        next(boom.unauthorized('Rol no autorizado'));
    }
}

function checkRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            next(boom.unauthorized('Rol no autorizado'));
        } else {
            next();
        }
    }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };