const mailSender=require("../utils/mailSender");

require("dotenv").config();

exports.contactUs=async (req,res)=>{
    try{

        console.log("request received",req.body);
        const {firstName,lastName,email,contactNumber,message}=req.body;
        // const userId=req.user.id;

        

        if(!firstName||!lastName||!email||!contactNumber||!message)
        {
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            });
        }

        const title=`Contact request from ${firstName} `;

        const orignalMessage=`${firstName} ${lastName} Phone-No ${contactNumber}, email=${email} has the following request ${message}`;

        const eduVerseEmail=process.env.CONTACTUS_EMAIL;

        const mailSentToEduverse=mailSender(eduVerseEmail,title,orignalMessage);

        console.log("MAIL SENT TO EDUVERSE SUPPORT TEAM",mailSentToEduverse);

        const payload=`Dear ${firstName} your request has been received`;
        

        const mailSentToUser=mailSender(email,`Data received`,payload);

        if(!mailSentToEduverse||!mailSentToUser)
        {
            return res.status(400).json({
                success:false,
                message:"Something inside went wrong while sending mail to user and Eduverse"
            });
        }


        return res.status(200).json({
            success:true,
            message:"Mail successfully sent to user and Eduverse"
        });
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending mail to user and Eduverse",
        });
    }
}