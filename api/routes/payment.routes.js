import express from "express";
import { verifyToken } from "../middleware/authJwt.js";
import {processPayment, getStripeApiKey} from "../controllers/payment.controller.js";


const router = express.Router();

router.route("/payment/process").post(verifyToken, processPayment);
router.route("/stripe_api_key").get(verifyToken, getStripeApiKey);

export default router;