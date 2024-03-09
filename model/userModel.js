const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    // username, bio, and profile picture URL, use uuid for user-ids.
    username:{
        type:String,
        required:[true,"username is required field"]
    },
    bio:{
        type:String,
        
    },
    pic_url:{
        type:String,
    },
    uuid:{
        type:String,
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]

});
userSchema.set('timestamps',true);

// userSchema.pre('save',function(next){
//     const x = uuidv4();
//     console.log("uuid - "+x);
//     this.uuid = x;
//     next();
// })

const User = mongoose.model('User',userSchema);
// userSchema.createIndex( { "timestamp": -1 } );
module.exports = User;