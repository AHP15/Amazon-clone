import express from "express";
import { 
    deleteUser,
    download,
    forgotPassword,
    getAllUsers,
    getUser,
    getUserdetails,
    login,
    logout,
    register,
    resetPassword,
    upDatePassword,
    upDateProfile,
    updateUserRole
} from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middleware/authJwt.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.route("/auth/register").post(upload,register);
router.get("/auth/files/:name",download);
router.route("/auth/login").post(login);
router.route("/auth/password/forgot").post(forgotPassword);
router.route("/auth/password/reset/:token").put(resetPassword);
router.route("/auth/logout").get(logout);
router.route("/auth/me").get(verifyToken, getUserdetails);
router.route("/auth/me/update").put(verifyToken,upload, upDateProfile);
router.route("/auth/password/update").put(verifyToken, upDatePassword);
router.route("/admin/users").get(verifyToken, isAdmin, getAllUsers);
router.route("/admin/user/:id")
        .get(verifyToken, isAdmin, getUser)
        .put(verifyToken, isAdmin, updateUserRole)
        .delete(verifyToken, isAdmin, deleteUser);

export default router;