const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserService();

const localStrategy = new Strategy({usernameField: 'email'}, async (email, password, done)=>{
    try {
        const user = await service.findByEmail(email);
        if (!user) {
            return done(boom.unauthorized(), false);
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(boom.unauthorized(), false);
        }
        done(null, user);
        
    } catch (error) {
        return done(error, false);
    }
});

module.exports = localStrategy;