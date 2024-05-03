import { usersDAO } from '../dao/users/indexUsers.js'; 
import * as cartService from '../services/cartService.js';
import { createHash } from '../utils/bcrypt.js';

export const register = async (userData) => {
    try {
        const existingUser = await usersDAO.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
       
        if (
            userData.email === 'adminCoder@coder.com' &&
            userData.password === 'adminCod3r123'
        ) {
            userData.isAdmin = true;
        } else {
            userData.isAdmin = false;
        }
        
        userData.password = createHash(userData.password);
        
        const newUser = await usersDAO.createUser(userData);
        
        const newCart = await cartService.createCart();
        await usersDAO.updateUserCart(newUser._id, newCart._id); 

        console.log("User registered successfully:", newUser);
        return newUser;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error('Failed to register');
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
export const registerAdmin = async (userData) => {
    try {
        const existingUser = await usersDAO.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }        
        const hashedPassword = createHash(userData.password);
        const newUser = await usersDAO.createUser({
            ...userData,
            password: hashedPassword,
            role: 'Admin'
        });
        console.log("Admin user registered successfully:", newUser);
        return newUser;
    } catch (error) {
        console.error("Error registering admin user:", error);
        throw new Error('Failed to register admin user');
    }
};