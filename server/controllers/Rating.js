// const User=require("../models/User");
// const Course=require("../models/Course");
// const RatingAndReview=require("../models/RatingAndReview");



// exports.createRating=async(req,res)=>{
//     try{

//         const {user,courseId,rating,review}=req.body;

//         if(!user||!courseId||!rating||!review)
//         {
//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are mandatory"
//             });
//         }

//         const newRating=await RatingAndReview.create({
//             user,
//             rating,
//             review
//         });

//         await newRating.populate("user");


//         const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},
//                                                             {
//                                                                 $push:{
//                                                                     ratingAndReviews:newRating._id,
//                                                                 }
//                                                             },
//                                                             {new:true}
//                                                             ).populate("ratingAndReviews");

//         return res.status(200).json({
//             success:true,
//             newRating
//         });


//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }


// exports.getAverageRating=async(req,res)=>{
//     try{

//         const {courseId}=req.body;

        

//         const course=await Course.findById(courseId).populate("ratingAndReviews");

//         if (!course) {
//             return res.status(400).json({
//                 success:false,
//                 message:"No such course exists"
//             });
//         }

//         //const allFeedback=course.ratingAndReviews;

//         if(!course.ratingAndReviews.length)
//         {
//             const avgRating=0;

//             return res.status(400).json({
//                 success:false,
//                 avgRating
//             });
//         }

//         const ratings = course.ratingAndReviews.map(review => review.rating);

//         const avgRating=ratings.reduce((sum,rating)=>sum+rating,0)/ratings.length;

//         return res.status(200).json({
//             success:true,
//             avgRating
//         });

//     }   
//     catch(error)
//     {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         });

//     }
// }

// exports.getAllRatings=async(req,res)=>{
//     try{
//         const {courseId}=req.body;

//         const course=await Course.findById(courseId).populate("ratingAndReviews");

//         if (!course) {
//             return res.status(400).json({
//                 success:false,
//                 message:"No such course exists"
//             });
//         }

//        const allRatings=course.ratingAndReviews;
    
//         return res.status(400).json({
//             success:false,
//             allRatings
//         });

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }






