import passport from "passport";

import { UserDTO } from '../dto/user.dto.js';

export const register = async (req, res, next) => {
    try {
        req.session.user = req.user;
        console.log("User registered successfully:", req.session.user);
        res.status(200).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res, next) => {
    try {
        console.log("Attempting login for username:", req.body.email);
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.error("Error during login:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            if (!user) {
                console.error("Authentication failed:", info.message);
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.session.user = user;
            console.log("User logged in successfully:", req.session.user);
            return res.status(200).json({ msg: "User logged in successfully" });
        })(req, res, next);
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(400).json({ error: error.message });
    }
};

export const logout = async (req, res, next) => {
    try {
        req.logout((err) => {
            if (err) {
                console.error("Error logging out:", err);
                return next(err);
            }
            req.session.destroy(() => {
                console.log("User logged out successfully");
                res.status(200).json({ msg: "User logged out successfully" });
            });
        });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(400).json({ error: error.message });
    }
};

export const loginWithGithub = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            console.error("Error logging in with Github:", err);
            res.status(400).json({ error: err.message });
            return;
        }
        if (!user) {
            console.error("Failed to login with Github");
            res.status(400).json({ error: "Failed to login with Github" });
            return;
        }
        req.session.user = user;
        console.log("User logged in with Github successfully:", req.session.user);
        res.status(200).json({ msg: "User logged in with Github successfully" });
    })(req, res, next);
};
export const upgradeToPremium = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await userService.upgradeUserToPremium(userId);
        res.status(200).json({ message: 'User upgraded to premium successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const currentUser = req.session.user;
        const currentUserDTO = UserDTO.fromModel(currentUser);
        res.status(200).json(currentUserDTO);
    } catch (error) {
        console.error("Error obteniendo el usuario actual:", error);
        res.status(400).json({ error: error.message });
    }
};
export const registerAdmin = async (req, res) => {
    try {
        if (req.session.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Forbidden. Admin access required.' });
        }

        const { first_name, last_name, email, password } = req.body;
        const userData = { first_name, last_name, email, password };

        const newUser = await usersService.registerAdmin(userData);

        res.status(201).json({ message: 'Admin user created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ error: 'Failed to create admin user' });
    }
};