const mongoose = require("mongoose")

const post_schema = new mongoose.Schema({
  
    caption:String,

    image:{
       public_id:String,
       url:String
    },
    
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
   
    like:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],

    like_count:{type:Number , default:0},

    comments:[{
        user:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        comment:{
            type:String,
            required:true
        }
}]


})

module.exports = mongoose.model("Post" , post_schema)