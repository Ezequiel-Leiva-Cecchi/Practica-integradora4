import { Router } from "express";
import { renderAdminPage,renderIndexPage,renderProductsPage, renderProductPage, renderCartPage, renderLoginPage, renderRegisterPage,renderSendRecoveryEmailPage } from "../controllers/views.controller.js";
import {requireAuth, checkExistingUser,requireAdminAuth} from "../middlewares/authMiddleware.js";

const viewsRoutes = Router();

viewsRoutes.get('/', requireAuth, renderIndexPage);
viewsRoutes.get('/products', requireAuth, renderProductsPage);
viewsRoutes.get('/product/:pid', requireAuth, renderProductPage);
viewsRoutes.get('/cart/:cid', requireAuth, renderCartPage);
viewsRoutes.get('/login', checkExistingUser, renderLoginPage);
viewsRoutes.get('/register', checkExistingUser, renderRegisterPage);
viewsRoutes.get('/send-email',renderSendRecoveryEmailPage);
viewsRoutes.get('/admin', requireAdminAuth, renderAdminPage);
export default viewsRoutes;
