const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        requried:true,
        trim:true
    },
    lastName:{
        type:String,
        requried:true,
        trim:true
    },
    email:{
        type:String,
        requried:true,
        trim:true
    },
    password:{
        type:String,
        requried:true,
    },
    confirmPassword:{
        type:String,
        requried:true,
    },
    // contactNumber:{
    //     type:String,
    // },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        requried:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    image:{
        type:String,
        required:true
    },

    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ],

    
    token:{
        type:String
    },

    resetPasswordExpires:{
        type:Date,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
},
{ timestamps: true }

)

module.exports=mongoose.model("User",userSchema);