import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name!!"],
        trim:true
    },
    description :{
        type: String,
        required : [true, "Please enter a product description!!"]
    },
    price: {
        type: Number,
        required: [true, "Please enter a product price!!"],
        maxlength:[8, "Price can not exceed 8 characters"]
    },
    rating: {
        type: Number,
        default:0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required:[true, "Please enter a product category!!"]
    },
    stock:{
        type: Number,
        required:[true, "Please enter a product stock!!"],
        maxlength:[4, "stock can not exceed 4 charcters !!"],
        default:1
    },
    numOfReviews: {
        type:Number,
        default:0,
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required: true
            }
        }
    ],
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

const Product = mongoose.model("Product", productSchema);

export default Product;