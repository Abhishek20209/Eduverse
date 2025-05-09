const mongoose=require("mongoose");

const categorySchma=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});

module.exports=mongoose.model("Category",categorySchma);