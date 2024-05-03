import { Router } from "express";
import { requireAuth, requireAdminAuth} from "../middlewares/authMiddleware.js";
import { getCurrentUser } from "../controllers/users.controller.js";
import { register, login, logout, loginWithGithub,createAdmin } from "../controllers/users.controller.js";
import passport from "passport";

const sessionRoutes = Router();

sessionRoutes.post('/register',passport.authenticate('register', { failureRedirect: '/failregister' }),register);
sessionRoutes.post('/login', passport.authenticate('login'), login);
sessionRoutes.post('/logout', requireAuth, logout);
sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }));
sessionRoutes.get('/current', requireAuth, getCurrentUser);
sessionRoutes.post('/admin/register', requireAdminAuth, createAdmin);

export default sessionRoutes;
