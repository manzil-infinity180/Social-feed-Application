const User = require("../model/userModel");
const Post = require("../model/postModel");

// get all post of that guy whose you followed (following)
exports.getAllPostFollowing = async (req,res,next) =>{
    try{
        const list = await User.findById(req.user).populate('following');
        // console.log(list);
        const x = list.following;
        console.log(x);
        res.status(200).json({
            status:"success",
            data : list
        })
       
    }catch(err){
       console.log(err)
    }
}

// get latest post of following 
exports.latestPostFollowing = async (req,res,next) =>{
    try{

    }catch(err){

    }
}

// get all post of your followers 
exports.getAllPostFollowers = async (req,res,next) =>{
    try{

    }catch(err){

    }
}
