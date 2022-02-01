import DB from "../models/index.js";
import { handleError, handleAsyncError } from "../utils/errorHandler.js";

const Product = DB.product;
const Order = DB.order;

const createOrder = handleAsyncError(async (req, res) =>{

    const order = await Order.create({
        ...req.body,
        paidAt:Date.now(),
        user:req.userId
    });

    res.status(201).send({
        success:true,
        order
    });
});

// Get single order
const getOrder = handleAsyncError(async (req, res) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return handleError(new Error("Order not found !"), 404, res);
    }

    res.status(200).send({
        success: true,
        order
    });
});

// Get orders for user
const myOrders = handleAsyncError(async (req, res) =>{

    const orders = await Order.find({user: req.userId});
    res.status(200).send({
        success: true,
        orders :orders.reverse()
    });
});

// Get all orders --> admin
const getAllOrders = handleAsyncError(async (req, res) =>{
    const orders = await Order.find();
    
    let totalAmount = 0;
    orders.forEach(order => {totalAmount += order.totalPrice});

    res.status(200).send({
        success: true,
        totalAmount,
        orders
    });
});

// Update order --> admin
const updateOrder = handleAsyncError(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if(order.orderStatus === "Delivered"){
        return handleError(new Error("Order has been already delivered !"), 400, res);
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave: false});

    res.status(200).send({
        success: true
    });
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({validateBeforeSave: false});
}

const deleteOrder = handleAsyncError(async (req, res) =>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return handleError(new Error("Order not found !"), 404, res);
    }

    await order.remove();
    res.status(200).send({
        success: false,
    });
});

export {createOrder, getAllOrders, getOrder, myOrders, updateOrder, deleteOrder};