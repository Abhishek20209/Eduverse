const express=require("express");
const app=express();


const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");
const contactUsRoutes=require("./routes/Contact")
const RatingsAndReviews=require("./routes/RatingsAndReviews");

const database=require("./config/database");
const cookieParser=require("cookie-parser");

require('dotenv').config();

const cors=require("cors");
const {clodinaryConnect}=require("./utils/cloudinary");
const fileUpload=require("express-fileupload");

const PORT=process.env.PORT||4000;

database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
)

clodinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contactUsRoutes);
app.use("/api/v1/reviews",RatingsAndReviews)



app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"yoour server is up and running",
    });
});


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

