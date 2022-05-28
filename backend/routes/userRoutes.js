import express from "express";
import {
  forgotPassword,
  getUserDetails,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

export default router;
