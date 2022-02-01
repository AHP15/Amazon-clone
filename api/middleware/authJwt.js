import jwt from 'jsonwebtoken';
import DB from '../models/index.js';
import { handleError } from '../utils/errorHandler.js';

const User = DB.user;

const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(403).send({
            success: false,
            message: "No token is provided!!",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({
                    success: false,
                    message: err.message
                });
        }

        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req, res, next) => {

    const user  = await User.findById(req.userId);//userId from verifyToken method
    if(user.role !== "admin"){
        return handleError(new Error("Admin role required!"), 403, res);
    }else{
        next();
    }
}

export { verifyToken, isAdmin };