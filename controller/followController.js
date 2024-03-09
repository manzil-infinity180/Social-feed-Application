const User = require("../model/userModel");
const Post = require("../model/postModel");
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
exports.followOthers = async(req,res,next)=>{
    try{
      // which is going to follow
      const authUser = await User.findById(req.user);

      const id = req.params.id;
       // user  can not follow it self 
       console.log(authUser._id + " " + id);
      if((authUser._id).toString() === id.toString()){
        throw new Error("You can not follow/unfollow ourself")
      }
       // check user already followed that or not 
      authUser.following.length > 0 
      && authUser.following.map((el)=>{
        if((el._id).toString() === id.toString()){
            throw new Error("Already followed");
        }
      });

      authUser.following.unshift(id);
      await authUser.save();



      const followedUser = await User.findById(id);
      followedUser.followers.unshift(authUser._id);
      await followedUser.save();
     
      successResponse(res,`You followed ${followedUser.username}`,200);

    }catch(err){
        failedResponse(res,err,400);

    }
}
exports.unfollowOthers = async(req,res,next)=>{
    try{
        const id = req.params.id;

        const authUser = await User.findById(req.user);

        if((authUser._id).toString() === id.toString()){
            throw new Error("You can not follow/unfollow ourself")
          }

        const x = authUser.following.filter((el)=>{

            console.log(el._id);
            console.log(el._id.toString());
            return (el._id).toString() !==(id).toString();
        });
        authUser.following = x;
        await authUser.save();
        const followedUser = await User.findById(id);
        const y = followedUser.followers.filter((el)=>{
            return (el._id).toString() !== (authUser._id).toString();
        })
        followedUser.followers = y;
       await followedUser.save();
       successResponse(res,`You unfollowed ${followedUser.username}`,200);

    }catch(err){
        failedResponse(res,err,400);

    }
}
exports.yourFollowingList = async (req,res,next)=>{
    try{
        const list = await User.findById(req.user,'following followers');

        successResponse(res,list,200);
        // const followingList = list.following;
        // console.log(User)


    }catch(err){
        failedResponse(res,err,400);

    }
}
exports.allOthersFollowList = async (req,res,next) =>{
    try{
        const list = await User.findById(req.params.id,'followers following');
        
        successResponse(res,list,200);

    }catch(err){
        failedResponse(res,err,400);

    }
}