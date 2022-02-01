import DB from "../models/index.js";
import { handleError, handleAsyncError } from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const User = DB.user;
const GridFSBucket = DB.mongoose.mongo.GridFSBucket;

//download receives file name as input parameter
const download = async (req, res) => {
    try {
        await DB.mongoose.connect(process.env.CONNECTION_URL);
  
      const bucket = new GridFSBucket(DB.mongoose.connection, {
        bucketName: "photos",
      });

  
      let downloadStream = bucket.openDownloadStreamByName(req.params.name);
      downloadStream.on("data", data => {
        res.write(data);
      });

      downloadStream.on("error", function (err) {
          console.log(err);
        return res.status(404).send({ message: "Cannot download the Image!" });
      });
      
    
      downloadStream.on("end", () => {
        res.end();
      });

    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
};
const baseUrl = "http://localhost:8080/api/v1/auth/files/"
const register = handleAsyncError(async (req, res) => {
    
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            image: req.file.id,
            url:baseUrl + req.file.filename,
        },
    });
    sendToken(user, 201, res);
});

const login = handleAsyncError(async (req, res) => {

    const {email, password} = req.body;

    if(!email || !password){
        return handleError(new Error("Email or password not provided !"), 400, res);
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return handleError(new Error(`User with email ${email} not found!`), 404, res);
    }

    const passwordIsValid = user.compatePasswords(password);

    if(!passwordIsValid){
        return handleError(new Error("Password incorrect !"), 401, res);
    }

    sendToken(user, 200, res);

});

const logout = handleAsyncError(async (req, res) => {

    res.cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).send({
        success: true,
        message: "Logged out"
    });
});

// Forgot password
const forgotPassword = handleAsyncError(async (req, res) => {
    
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return handleError(new Error("User not found!"), 404, res);
    }

    const resetToken = user.getResetPasswordToken();
    
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try{
        
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });
        await user.save({ validateBeforeSave: false });
        res.status(200).send({
            success: true,
            message: `Email sent to ${user.email} successfully.Please check your email`,
          });
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return handleError(err, 500, res);
    }
});

// Reset password

const resetPassword = handleAsyncError(async (req, res) => {
    
    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if(!user){
        return handleError(new Error("Reset Password Token is invalid or has been expired"),400,res);
    }

    if (req.body.password !== req.body.confirmPassword) {
        return handleError(new Error("Passwords does not match !"),400,res);
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    //sendToken(user, 200, res);
    res.status(201).send({
        success:true,
        message:"You has been reset your password successfully"
    });
});

const getUserdetails = handleAsyncError(async (req, res) => {
    const user = await User.findById(req.userId);

    res.status(200).json({
      success: true,
      user,
    });
});

// update user password

const upDatePassword = handleAsyncError(async (req, res) => {

    const user = await User.findById(req.userId).select("+password");

    const passwordIsValid = user.compatePasswords(req.body.oldPassword);

    if(!passwordIsValid){
        return handleError(new Error("Password invalid !"), 401, res);
    }

    if(req.body.newPassword !== req.body.confirmNewPassword){
        return handleError(new Error("Passwords does not match!"), 400, res);
    }
    
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// upDate user profile

const Chunks = DB.mongoose.connection.collection("photos.chunks");
const Files = DB.mongoose.connection.collection("photos.files");
const upDateProfile = handleAsyncError(async (req, res) => {

    const user = await User.findById(req.userId);
    await Chunks.findOneAndDelete({files_id:user.avatar.image});
    await Files.findOneAndDelete({_id:user.avatar.image});

    user.name = req.body.name;
    user.email = req.body.email;
    user.avatar = {            
        image: req.file.id,
        url:baseUrl + req.file.filename,
    };
    await user.save();

    res.status(200).json({
        success: true,
        user,
    });
    
});

// get all users --> admin

const getAllUsers = handleAsyncError(async (req, res) => {

    const users = await User.find();

    res.status(200).send({
        success: true,
        users
    });
});

// get one user --> admin
const getUser = handleAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if(!user){
        return handleError(new Error(`user with  id ${req.params.id} not found`), 404, res);
    }
    res.status(200).json({
      success: true,
      user,
    });
});

// update User Role --> admin
const updateUserRole = handleAsyncError(async (req, res) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if(!user){
        return handleError(new Error(`user with  id ${req.params.id} not found`), 404, res);
    }
  
    res.status(200).json({
      success: true,
    });
});

// Delete User --Admin
const deleteUser = handleAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if(!user){
        return handleError(new Error(`user with  id ${req.params.id} not found`), 404, res);
    }
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
});

export {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUserdetails,
    upDatePassword,
    upDateProfile,
    getAllUsers,
    getUser,
    updateUserRole,
    deleteUser,
    download
};