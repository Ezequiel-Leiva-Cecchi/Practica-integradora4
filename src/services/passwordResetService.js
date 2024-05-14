import { passwordResetDAO } from '../dao/passwordReset/indexPasswordReset.js';
import transporter from '../config/nodemailer.config.js';

export const sendEmailRecoveryPassword = async (email, resetToken) => {
    try {
        await passwordResetDAO.createResetToken(email, resetToken);

        const mailOptions = {
            from: 'ezequielleivacecchi@gmail.com',
            to: email,
            subject: 'Password Recovery',
            text: `Hi, we have received a request to reset your password. If you did not request this, you can ignore this email. Otherwise, click the following link to reset your password: http://localhost:8080/api/password-reset/reset/${resetToken}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Password recovery email sent successfully');
    } catch (error) {
        console.error('Error sending password recovery email:', error);
        throw new Error('Error sending password recovery email');
    }
};
