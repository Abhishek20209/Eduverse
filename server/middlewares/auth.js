const jwt=require("jsonwebtoken");
require("dotenv").config();
// const User=require("../models/User");



exports.auth=async (req,res,next)=>{
    try{
        console.log("reached auth");
        const token=req.cookies.token||req.body.token||req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"no token found"
            });
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            
            console.log(decode);

            req.user=decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Error while verifying the Token in auth"
            });
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while authentication" 
        });
    }
}

exports.isStudent=async(req,res,next)=>{
    try{

        if(req.user.accountType!=="Student")
        {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for student"
            });
        }
        next();
    }   
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while verifying role of student" 
        });
    }
}

exports.isInstructor=async(req,res,next)=>{
    try{

        if(req.user.accountType!=="Instructor")
        {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Instructor"
            });
        }
        next();
    }   
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while verifying role of Intructor" 
        });
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{

        if(req.user.accountType!=="Admin")
        {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Admin"
            });
        }
        next();
    }   
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while verifying role of Admin" 
        });
    }
}
