import Product from "./product.model.js";
import User from "./user.model.js";
import Order from "./order.model.js";
import mongoose from "mongoose";

const DB = {
    mongoose:mongoose,
    product: Product,
    user: User,
    order: Order,
}

export default DB;