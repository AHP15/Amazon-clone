import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter a user name!!"],
        maxlength:[30, "name can not exceed 30 charcters!!"],
        minlength:[4, "name must have at leat 4 characters!!"],
    },
    email:{
        type: String,
        required: [true, "Please enter a user email!!"],
        validate:[validator.isEmail, "Please enter a valid email!!"],
        unique: true
    },
    password:{
        type:String,
        required:[true, "Please enter a password"],
        minlength: [8, "name must have at leat 8 characters!!"],
        select: false,
    },
    avatar:{
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"photo",
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", function(next){
    
    if(!this.isModified("passowrd")){
        next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: parseFloat(process.env.JWT_EXPIRE)
    });
}

userSchema.methods.compatePasswords = function(clientPassword){
    return bcrypt.compareSync(clientPassword, this.password);
}

// Generate a reset password token
userSchema.methods.getResetPasswordToken = function(){
    
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256")
                                    .update(resetToken)
                                    .digest("hex");
    // Expire after 24 hours
    this.resetPasswordExpire = Date.now() + 86400 * 1000;

    return resetToken;

}

const User = mongoose.model("User", userSchema);

export default User;