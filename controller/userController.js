const User = require('../model/userModel');
const sendTokenCookies = require('../utils/sendTokenCookies'); 
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const successResponse = (res,output,responseCode=200)=>{
    res.status(responseCode).json({
        status:"success",
        data:{
            output
        }
     })
}
const failedResponse = (res,error,responseCode=400)=>{
    res.status(responseCode).json({
        status:"failed",
        err:error.message
    })

}
exports.createProfile= async (req,res,next)=>{
    try{
    // check user is already present ?
    // const checkUser = await User.findOne({$or: [{username:req.body.username},{email:req.body.email}]});
    const profileData = req.body;
    const x = uuidv4();
    profileData.uuid = x;
    console.log(x);
    const checkUser = await User.findOne({username:profileData.username});
    
    if(checkUser){
        throw new Error("User with these username or email already present");
    }

     const user = await User.create({
        "username":req.body.username,
        "bio":req.body.bio,
        "pic_url":req.body.pic_url,
        "uuid": profileData.uuid
     });
     sendTokenCookies(user,res);
    
     successResponse(res,user,200);

    }catch(err){
        failedResponse(res,err,400);

    }

}
exports.updateProfile = async(req,res,next) =>{
    try{
        const updatedData = req.body;
        const checkUsername = await User.findOne({username:req.body.username});
        if(checkUsername){
            throw new Error("User with these username already exist");
        }
        const user = await User.findByIdAndUpdate(req.user,updatedData);

        successResponse(res,"Updated profile successfully",200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.login = async (req,res,next) =>{
    try{
        const user = await User.findOne({username:req.body.username}).populate('post');
        if(!user){
            throw new Error("No user exist with these username");
        }
        sendTokenCookies(user,res);

        successResponse(res,user,200);

    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.viewProfile = async(req,res,next) =>{
    try{
        const user = await User.findById(req.user).populate('post');

        successResponse(res,user,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.otherProfile = async(req,res,next) =>{
    try{
        const user = await User.findOne({username : req.body.username}).populate('post');

        successResponse(res,user,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.deleteProfile = async(req,res,next) =>{
    try{
        await User.findByIdAndDelete(req.user);
        
        successResponse(res,"user account deleted successuly",200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.isAuthenicated = async(req,res,next)=>{
    try{
        let token;
        console.log("rahul")
        console.log(req.cookies);
        if(req.cookies.jwt){
            token = req.cookies.jwt;
          }
        if(!token){
            throw new Error("OOPs, Firstly you have to logined in !!");
          }
          
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const currentloginedUser = await User.findById(decode.id);
        req.user = currentloginedUser;
        next();

    }catch(err){
        failedResponse(res,err);
    }
}
