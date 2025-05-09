const mongoose=require("mongoose");
const mailSender=require("../utils/mailSender");
const emailTemplate=require("../mail/templates/emailVerificationTemplate");

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
    }
});


async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification email from Eduverse",emailTemplate(otp));
        console.log("email sent successfully",mailResponse);
    }
    catch(error){
        console.log("error occured while sending email",error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    if (this.isNew) {
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
})


module.exports=mongoose.model("OTP",otpSchema);