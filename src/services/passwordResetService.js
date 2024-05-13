import { passwordResetDAO } from '../dao/passwordReset/indexPasswordReset.js';
import transporter from '../config/nodemailer.config.js';

export const sendEmailRecoveryPassword = async (email, resetToken) => {
    try {
        // Guarda el token de restablecimiento en la base de datos
        await passwordResetDAO.createResetToken(email, resetToken);

        // Configura el correo electrónico
        const mailOptions = {
            from: 'ezequielleivacecchi@gmail.com',
            to: email,
            subject: 'Password Recovery',
            text: `Hi, we have received a request to reset your password. If you did not request this, you can ignore this email. Otherwise, click the following link to reset your password: http://localhost:8080/api/password-reset/reset/${resetToken}`
        };
        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);
        console.log('Password recovery email sent successfully');
    } catch (error) {
        console.error('Error sending password recovery email:', error);
        throw new Error('Error sending password recovery email');
    }
};
