import * as passwordResetService from '../services/passwordResetService.js';
import { usersDAO } from '../dao/users/indexUsers.js';

export const sendPasswordResetEmail = async (req, res) => {
    try {
        const { email } = req.user;
        const resetToken = await passwordResetService.generateResetToken(email);
        return res.json({ message: 'Password reset email sent successfully' });

    } catch (error) {
        console.error('Error sending password reset email:', error);
        return res.status(500).json({ error: 'Failed to send password reset email' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and newPassword are required' });
        }
        const user = await passwordResetService.verifyResetToken(token);
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        await usersDAO.changePassword(user, newPassword);
        return res.json({ message: 'Password reset successfully' });

    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ error: 'Failed to reset password' });
    }
};
