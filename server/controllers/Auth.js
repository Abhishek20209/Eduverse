const User=require("../models/User");
const OTP=require("../models/OTPS");
const otpGenerator=require("otp-generator");
const Profile=require("../models/Profile");
const express = require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender=require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


require("dotenv").config();

function validateEmail(email) {
    // Regular expression for validating a general email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
        console.log("Valid email address!");
        return true;
    } else {
        console.log("Invalid email address!");
        return false;
    }
}

exports.sendOTP=async (req,res)=>{
    try{
        
        const {email}=req.body;

        if(!validateEmail(email))
        {
            return res.status(401).json({
                success:false,
                message:"Enter a valid Email"
            });
        }

        const chekEmailPresent=await User.findOne({email});

        if(chekEmailPresent)
        {
            return res.status(401).json({
                success:false,
                message:"user already registered please login"
            });
        }
        
        var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

        console.log("OTP generated is",otp);

        var result=await OTP.findOne({otp:otp});

        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result=await OTP.findOne({otp:otp});
        }

        const otpPayload={email,otp};

        const otpBody=await OTP.create(otpPayload);
        
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message 
        })
    }
}



exports.signUp=async (req,res)=>{
    try{

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        }=req.body;


        if(!firstName||!lastName||!email||!password||!confirmPassword||!otp)
        {
            return res.status(503).json({
                success:false,
                message:"All feilds are required",
            });
        }

        if(password!==confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and confirm password don't match",
            });
        }

        const existingUser=await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already registered",
            });
        }

         const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1); 

         console.log("recentOTP",recentOtp);

         if(recentOtp.length==0)
         {
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            });
         }
         else if(recentOtp[0].otp!==otp)
         {
            return res.status(400).json({
                success:false,
                message:"incorrect OTP"
            });
         }

        //  if(!validateGmail(email))
        //  {
        //     return res.status(400).json({
        //         success:false,
        //         message:"Enter a correct email"
        //     });
        //  }

         const hashedPassword=await bcrypt.hash(password,10);

         const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
         });

         let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

         const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
         })

         return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user,
         });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Some error occured while signup.Please try again",
         });

    }
}

exports.login=async (req,res)=>{
    try{

        const {email,password}=req.body;

        if(!email||!password)
        {
            return res.status(503).json({
                success:false,
                message:"All feilds are required",
            });
        }

        if(!validateEmail(email))
            {
               return res.status(400).json({
                   success:false,
                   message:"Enter a correct email"
               });
            }

        const user=await User.findOne({email}).populate("additionalDetails");

        if(!user){
            
                return res.status(400).json({
                 success:false,
                    message:"User is not registered",
                });
        }

        if(await bcrypt.compare(password,user.password)){

            const payload={
                email:user.email,
                accountType:user.accountType,
                id:user._id, 
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2H",
            });

            user.token=token;

            user.password=undefined;

            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            });
        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            });
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong wthile logging in",
        });
    }
}


exports.changePassword=async (req,res)=>{
    try{

        const email=req.user.email;
        const {oldPassword,newPassword}=req.body;

        if(!email||!oldPassword||!newPassword)
            {
                return res.status(403).json({
                    success:false,
                    message:"All feilds are required",
                });
            }

        // if(confirmPassword!==newPassword)
        // {
        //     return res.status(503).json({
        //         success:false,
        //         message:"Password and confirm password donot match",
        //     });
        // }

        const user=await User.findOne({email:email});

        if(!user)
            {
                    return res.status(400).json({
                     success:false,
                        message:"User is not registered",
                    });
            }
        
        if(await bcrypt.compare(oldPassword,user.password))
        {
            const hashedNewPass=await bcrypt.hash(newPassword,10);

            const updatedUser=await User.findOneAndUpdate(
                {email:email},
                {password:hashedNewPass},
                {new:true}
            );

            //console.log("updated passsword is",updatedUser);
            
            try{
                // const mailInfo=await mailSender(email,
                //     passwordUpdated(
                //         updatedUser.email,
                //         `Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`
                //     )
                // );

                const mailInfo = await mailSender(
                    email,
                    "Password Updated Successfully", // <-- this is the subject
                    passwordUpdated(
                      updatedUser.email,
                      `${updatedUser.firstName} ${updatedUser.lastName}`
                    )
                  );

                console.log("mail info at chage password route backend",mailInfo);

                return res.status(200).json({
                    success:true,
                    message:"Password updated successFully",
                });
            }
            catch(error){
                return res.status(500).json({
                    success:false,
                    message:error.message,
                });
            }
            

        }
        else
        {
            return res.status(400).json({
                success:false,
                message:"Incorrect Password",
            });
        }

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