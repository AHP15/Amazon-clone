import express from "express";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import orderRouter from './routes/order.routes.js';
import paymentRouter from "./routes/payment.routes.js";
import DB from "./models/index.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const APP = express();
APP.use(express.json());
APP.use(cookieParser());
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(bodyParser.json());


if(process.env.NODE_ENV !== "PRODUCTION"){
    import("dotenv").then(dotenv => {
        dotenv.config();
    });
}


// connection to the DB
DB.mongoose.connect(process.env.CONNECTION_URL)
.then(() => {
    console.log("Connecting to the DB seccussfully!!");
})
.catch(err => {
    console.log("Error while connecting to the db", err);
    process.exit();
});



APP.use("/api/v1", productRouter);
APP.use("/api/v1", userRouter);
APP.use("/api/v1", orderRouter);
APP.use("/api/v1/", paymentRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));
APP.use(express.static(path.join(__dirname, "../client/build")));

APP.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});


export default APP;