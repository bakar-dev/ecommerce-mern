import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product")
  .post(isAuthenticatedUser, authorizeRoles, createProduct);
router
  .route("/product/:id")
  .get(getProduct)
  .put(isAuthenticatedUser, authorizeRoles, updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles, deleteProduct);

export default router;
