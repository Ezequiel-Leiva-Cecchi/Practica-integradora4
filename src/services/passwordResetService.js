import jwt from 'jsonwebtoken';
import { createHash } from '../utils/bcrypt.js';
import { passwordResetDAO } from '../dao/passwordReset/indexPasswordReset.js';
import nodemailer from 'nodemailer';

const secretKey = process.env.GOOGLE_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'smt.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: 'ezequielleivacecchi@gmail.com',
        pass: process.env.GOOGLE_PASSWORD
    }
});

export const generateResetToken = async (email, expiresIn = '1h') => {
    const token = jwt.sign({ email }, process.env.GOOGLE_PASSWORD, { expiresIn });
    await passwordResetDAO.createResetToken(email, token);
    return token;
};

export const verifyResetToken = async (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        const email = decoded.email;
        const isValidToken = await passwordResetDAO.findResetTokenByToken(token);
        if (!isValidToken) {
            throw new Error('Invalid or expired token');
        }
        return email;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error('Error verifying token');
        }
    }
};

export const changePassword = async (email, newPassword) => {
    try {
        const hashedPassword = createHash(newPassword);
        await usersDAO.changePassword(email, hashedPassword); 
    } catch (error) {
        throw new Error('Error changing password');
    }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const mailOptions = {
            from: 'ezequielleivacecchi@gmail.com',
            to: email,
            subject: 'Restablecimiento de contraseña',
            text: `Hemos recibido una solicitud para restablecer tu contraseña. Si no solicitaste esto, puedes ignorar este correo electrónico. De lo contrario, haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:8080/api/password-reset/reset/${resetToken}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};
