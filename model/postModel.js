const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({
    // text content, a timestamp, and the ID of the user who created it.
    text:{
        type:String,
        required:[true,"Text content is required field"]
    },
    userid:{
        type:String,
    }
});
postSchema.set('timestamps',true);


const Post = mongoose.model('Post',postSchema);
// postSchema.createIndex( { "timestamp": -1 } );
module.exports = Post;