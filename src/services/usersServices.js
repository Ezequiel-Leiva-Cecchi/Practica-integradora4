import { usersDAO } from '../dao/users/indexUsers.js';
import { createHash } from '../utils/bcrypt.js';

export const register = async (userData) => {
    try {
        const existingUser = await usersDAO.getUserByEmail(userData);
        if (existingUser) {
            throw new Error('El correo electrónico ya está en uso');
        } else {
            const newUser = await usersDAO.createUser(userData);
            return newUser;
        }
    } catch (error) {
        throw new Error('Error al registrar usuario');
    }
};


export const login = async (userData) => {
    try {
        const existingUser = await usersDAO.findUserByEmailAndPassword(userData.email, userData.password);
        if (!existingUser) {
            throw new Error('Invalid email or password');
        }
        console.log("User logged in successfully:", existingUser);
        return existingUser;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error('Failed to login');
    }
};

export const logout = async (req) => {
    try {
        await req.session.destroy();
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error);
        throw new Error('Failed to logout');
    }
};

export const loginWithGithub = async (userData) => {
    return userData;
};
export const upgradeUserToPremium = async (userId) => {
    try {
        const updatedUser = await usersDAO.upgradeToPremium(userId);
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};