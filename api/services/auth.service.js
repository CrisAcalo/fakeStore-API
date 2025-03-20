const boom = require('@hapi/boom');
const UserService = require('./user.service');
const { config } = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const userService = new UserService();

class AuthService {

    constructor() {
    }

    async getUser(email, password) {
        const user = await userService.findByEmail(email);

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw boom.unauthorized('Invalid password');
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const secret = config.jwtSecret;
        const token = jwt.sign(payload, secret);
        return {
            token,
            user
        };
    }

    async resetPassword(email) {
        const user = await userService.findByEmail(email);
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
        await userService.update(user.id, { recoveryToken: token });
        const link = `${config.urlResetPasswordFront}?token=${token}`;

        const mail = {
            from: config.smtp_email, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Reset your password", // Subject line
            text: "Reset your password", // plain text body
            html: `
            <b>Ingresa a este enlace para recuperar tu contraseña</b><br>
            <a href="${link}">${link}</a>
            `
        };
        return await this.sendEmail(mail);
    }

    async changePassword(token, password, passwordConfirmation) {
        try {
            const payload = jwt.verify(token, config.jwtSecret);
            if (password !== passwordConfirmation) {
                throw boom.badRequest('Passwords do not match');
            }

            const user = await userService.findOne(payload.sub);
            if (user.recoveryToken !== token) {
                throw boom.unauthorized();
            }

            const hash = await bcrypt.hash(password, 10);
            await userService.update(user.id, { password: hash, recoveryToken: null });

            return { message: 'Password changed' };
        } catch (error) {
            throw boom.unauthorized();
        }
    }

    async sendEmail(emailToSend) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: config.smtp_email,
                pass: config.smtp_password
            }
        });
        await transporter.sendMail(emailToSend);
        return { message: 'Email sent' };
    }
}

module.exports = AuthService;
