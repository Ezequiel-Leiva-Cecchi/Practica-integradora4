import { Router } from "express";
import { getCart, addCart, addProductInCart, deleteProductFromCart, deleteCart,purchaseCart} from '../controllers/cart.controller.js';
import { requireUserAuth } from "../middlewares/authMiddleware.js";
const cartRouter = Router();

cartRouter.get('/:cid', getCart);
cartRouter.post('/',requireUserAuth, addCart);
cartRouter.post('/:cid/p/:pid',requireUserAuth, addProductInCart);
cartRouter.delete('/:cid/p/:pid',requireUserAuth, deleteProductFromCart); 
cartRouter.post('/:cid/purchase', requireUserAuth, purchaseCart);
cartRouter.delete('/:cid',requireUserAuth, deleteCart);
export default cartRouter;
