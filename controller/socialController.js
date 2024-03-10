const User = require("../model/userModel");
const Post = require("../model/postModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// get all post of that guy whose you followed (following)

// without aggregation pipeline 
exports.getAllPostFollowing = async (req,res,next) =>{
    try{
        const user = await User.findById(req.params.id);
        console.log(user);
        const allPost = await Post.find({userid : user.uuid}).sort({createdAt:-1});
        // console.log(list);
        // const x = list.following;
        console.log(allPost);
        res.status(200).json({
            status:"success",
            data : allPost
        })
       
    }catch(err){
       console.log(err)
    }
}

exports.getFollowingPost = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        const allPost = await Post.aggregate([
            {
               $match : {userid : user.uuid}
            },
            {
                $sort : {createdAt : -1}
            }
        ]);

        // const allPost = await User.aggregate([
        //     {
        //         $match:{_id : new ObjectId(req.params.id)}
        //     },
        //     {
        //         $project:{_id: 1,uuid:1 }
        //     },
        //     {
        //       $lookup:{
        //         from:'Post',
        //         localField:'uuid',
        //         foreignField:'userid',
        //         as:'allpost'
        //       }
        //     },
            // {
            //     $unwind:"$allpost"
            // }

            // {
            //     $match:{$userid : uuid}
            // },
            // {
            //     sort:{createdAt:-1}
            // }
        // ])
        res.status(200).json({
            status:"success",
            data : allPost
        })

    }catch(err){
        console.log(err)


    }
}
