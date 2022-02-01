import express from "express";
import { 
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrder,
    myOrders, 
    updateOrder
} from "../controllers/order.controller.js";
import { isAdmin, verifyToken } from "../middleware/authJwt.js";

const router = express.Router();

router.route("/order/new").post(verifyToken, createOrder);
router.route("/order/:id").get(verifyToken, getOrder);
router.route("/orders/me").get(verifyToken, myOrders);

router.route("/admin/orders").get(verifyToken, isAdmin, getAllOrders);
router.route("/admin/order/:id")
        .put(verifyToken, isAdmin, updateOrder)
        .delete(verifyToken, isAdmin, deleteOrder);

export default router;