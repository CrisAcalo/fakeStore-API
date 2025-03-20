const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');
const { loginSchema, recoverySchema, changePasswordSchema } = require('../schemas/auth.schema');
const validatorHandler = require('../middlewares/validator.handler');
const service = new AuthService();

const router = express.Router();

router.post('/login',
    validatorHandler(loginSchema, 'body'),
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            res.json(service.signToken(req.user));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recovery',
    validatorHandler(recoverySchema, 'body'),
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const rta = await service.resetPassword(email);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/change-password',
    validatorHandler(changePasswordSchema, 'body'),
    async (req, res, next) => {
        try {
            const { token, password, passwordConfirmation } = req.body;
            const rta = await service.changePassword(token, password, passwordConfirmation);
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;