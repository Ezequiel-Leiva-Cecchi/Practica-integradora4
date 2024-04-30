import jwt from 'jsonwebtoken';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { passwordResetDAO } from '../dao/passwordReset/indexPasswordReset.js';
import nodemailer from 'nodemailer'; 

const secretKey = process.env.SESSION_SECRET; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth: {
        user: 'ezequielleivacecchi@gmail.com', 
        pass: process.env.GOOGLE_PASSWORD
    }
});

export const generateResetToken = async (userId, expiresIn = '1h') => {
    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    await passwordResetDAO.saveResetToken(userId, token);
    return token;
};

export const verifyResetToken = async (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        const isValidToken = await passwordResetDAO.verifyResetToken(userId, token);
        if (!isValidToken) {
            throw new Error('Invalid or expired token');
        }
        return userId; 
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

export const changePassword = async (userId, newPassword) => {
    try {
        const hashedPassword = createHash(newPassword);
        await passwordResetDAO.updatePassword(userId, hashedPassword);
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
            text: `Hemos recibido una solicitud para restablecer tu contraseña. Si no solicitaste esto, puedes ignorar este correo electrónico. De lo contrario, haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:8080/api/password-reset/reset`
        };

        await transporter.sendMail(mailOptions); 
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};