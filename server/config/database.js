// const mongoose=require("mongoose");
// require("dotenv").config();

// exports.connect=()=>{
//     mongoose.connect(process.env.MONGODB_URL,{
//         // useNewUrlParser:true,
//         // useUnifiedTopology:true
//     })
//     .then(()=>{console.log("db connection successfull")})
//     .catch((error)=>{
//         console.log("issue in db connection");
//         console.error(error); 
//         process.exit(1);
//     });
// }

const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB connection successful");
        })
        .catch((error) => {
            console.error("Issue in DB connection:", error);
            process.exit(1);
        });
};
