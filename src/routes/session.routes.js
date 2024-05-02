import { Router } from "express";
import { requireAuth, requireAdminAuth} from "../middlewares/authMiddleware.js";
import { getCurrentUser } from "../controllers/users.controller.js";
import { register, login, logout, loginWithGithub, upgradeToPremium,registerAdmin } from "../controllers/users.controller.js";
import passport from "passport";

const sessionRoutes = Router();

sessionRoutes.post('/register',passport.authenticate('register', { failureRedirect: '/failregister' }),register);
sessionRoutes.post('/login', passport.authenticate('login'), login);
sessionRoutes.post('/logout', requireAuth, logout);
sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }));
sessionRoutes.put('/users/premium/:uid', requireAuth, upgradeToPremium);
sessionRoutes.post('/admin/register', requireAdminAuth, registerAdmin);
sessionRoutes.get('/current', requireAuth, getCurrentUser);

export default sessionRoutes;
