import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProduct,
  getProductReviews,
  updateProduct,
} from '../controllers/productController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.route('/products').get(getAllProducts);
router
  .route('/product')
  .post(isAuthenticatedUser, authorizeRoles, createProduct);
router
  .route('/product/:id')
  .get(getProduct)
  .put(isAuthenticatedUser, authorizeRoles, updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles, deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router
  .route('/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

export default router;
