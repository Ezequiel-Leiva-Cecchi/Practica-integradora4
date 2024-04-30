import { Router } from 'express';
import { getProducts, getProduct, addProduct, editProduct, deleteProduct } from '../controllers/product.controller.js';

const ProductsRouter = Router();
ProductsRouter.get('/', getProducts);
ProductsRouter.get('/:productId', getProduct);
ProductsRouter.post('/', addProduct);
ProductsRouter.put('/:productId', editProduct);
ProductsRouter.delete('/:productId', deleteProduct);

export default ProductsRouter;
