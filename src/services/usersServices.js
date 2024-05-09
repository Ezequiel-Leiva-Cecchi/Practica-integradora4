import { usersDAO } from '../dao/users/indexUsers.js';
import { createHash } from '../utils/bcrypt.js';

export const register = async (userData) => {
    try {
        const existingUser = await usersDAO.findUserByEmail(userData.email);
        if (existingUser) {
            console.log(existingUser);
            throw new Error('Email is already in use');
        } else {
            const hashedPassword = createHash(userData.password)
            console.log("UserData" + JSON.stringify(userData));
            const newUser = {
                ...userData,
                password: hashedPassword
            };
            const createdUser = await usersDAO.createUser(newUser);
            return createdUser;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error registering user');
    }
};


export const login = async (userData) => {
    try {
        const existingUser = await usersDAO.findUserByEmail(userData.email);
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
        console.error(error);
        throw new Error(error.message);
    }
};