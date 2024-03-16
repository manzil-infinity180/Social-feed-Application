const Post = require('../model/postModel');
const User = require("../model/userModel");
const successResponse = (res,output,responseCode=200)=>{
    res.status(responseCode).json({
        status:"success",
        output
        
     })
}
const failedResponse = (res,error,responseCode=400)=>{
    res.status(responseCode).json({
        status:"failed",
        err:error.message
    })
}

exports.createPost= async (req,res,next)=>{
    try{
    // check user is already present ?
    const authUser = await User.findById(req.user);
    const userId = authUser.uuid;
    // console.log(userId)

     const post = await Post.create({
        "text":req.body.text,
        "userid":userId
     });

     authUser.post.unshift(post._id)
     await authUser.save();
    
     successResponse(res,post,200);

    }catch(err){
        failedResponse(res,err,400);

    }

}
exports.updatePost = async(req,res,next) =>{
    try{
        const {text} = req.body;
        const id = req.params.id;
        if(req.body.userid){
            throw new Error("You can only change the post detail");
        }
        const authUser = await User.findById(req.user);
        const postToUpdate = await Post.findById(req.params.id);
        console.log("userid "+authUser.uuid +"& uuid " +postToDelete.user_id);
        if(postToUpdate.userid === authUser.uuid){
            throw new Error("No permission to change others post");
        }

        const post = await Post.findByIdAndUpdate(id,{text:text});

        successResponse(res,"Post updated successfully",200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.viewPost = async(req,res,next) =>{
    try{
        // get the post using the _id of post
        const post = await Post.findById(req.params.id);

        successResponse(res,post,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
exports.viewAllPost = async(req,res,next) =>{
    try{
        const post = await Post.find({});

        successResponse(res,post,200);
    }catch(err){
        failedResponse(res,err,400);
    }
}

exports.deletePost = async(req,res,next) =>{
    try{
        const authUser = await User.findById(req.user);
        const postToDelete = await Post.findById(req.params.id);
         console.log("userid "+authUser.uuid +"& uuid " +postToDelete.userid);
        if(postToDelete.userid === authUser.uuid){
            throw new Error("No permission to change others post");
        }
        // delete the post by _id 
        await Post.findByIdAndDelete(req.params.id);
        
        successResponse(res,"post deleted successuly",200);
    }catch(err){
        failedResponse(res,err,400);
    }
}
