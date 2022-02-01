import stripe from "stripe";
import { handleAsyncError } from "../utils/errorHandler.js";

const processPayment = handleAsyncError(async (req, res) =>{

    const payment = await stripe(process.env.STRIPE_SECRET_KEY).paymentIntents.create({
        amount:req.body.amount,
        currency:"usd",
        metadata:{
            company: "Amazon-clone",
        }
    });

    res.status(200).send({
        success:true,
        client_secret:payment.client_secret
    });
});

const getStripeApiKey = handleAsyncError(async (req, res) =>{
    res.status(200).send({
        success:true,
        apiKey:process.env.STRIPE_API_KEY
    });
});

export {processPayment, getStripeApiKey};