const cloudinary=require("cloudinary").v2;


exports.clodinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
    }
    catch(error){
        console.log("error occured while connectiong to cloudinary");
    }
}
