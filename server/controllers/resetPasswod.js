const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const crypto=require("crypto");
const bcrypt=require("bcrypt");

exports.resetPasswordToken=async(req,res)=>{
    try{

        const email=req.body.email;

        const user=await User.findOne({email:email});
 
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"Email is not registered"
            });
        }

        const token=crypto.randomUUID(); 

        const updatedUser=await User.findOneAndUpdate(
                            {email:email},
                            {
                                token:token,
                                resetPasswordExpires:Date.now()+5*60*1000,
                            },
                            {new:true}
        )


        const url=`http://localhost:3000/update-password/${token}`;

        const mailInfo=await mailSender(email,"Password Reset Link",`Password reset Link is ${url}`);

        return res.status(200).json({
            success:true,
            message:"Password Reset Link sent seccessfully "
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending the reset password mail"
        });
    }
}


exports.resetPassword=async (req,res)=>{
    try{

        const {token,password,confirmPassword}=req.body;

        if(confirmPassword!==password)
        {
            return res.status(503).json({
                success:false,
                message:"Password and confirm password donot match",
            });
        }

        const user=await User.findOne({token:token});

        if(!user)
            {
                    return res.status(400).json({
                     success:false,
                        message:"Invalid Token ",
                    });
            }

        if(user.resetPasswordExpires<Date.now())
        {
            return res.status(400).json({
                success:false,
                   message:"Token is expired. Regenerate the token ",
               });
        }
        
       
            const hashedNewPass=await bcrypt.hash(password,10);

            const updatedUser=await User.findOneAndUpdate(
                {token:token},
                {password:hashedNewPass},
                {new:true}
            );

            //console.log("updated passsword is",updatedUser);

            return res.status(200).json({
                success:true,
                message:"Password updated successFully",
            });

    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating password",
            error,
        });
    }
}