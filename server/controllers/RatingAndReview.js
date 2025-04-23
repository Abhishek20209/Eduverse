const User=require("../models/User");
const Course=require("../models/Course");
const RatingAndReview=require("../models/RatingAndReview");



exports.createRating=async(req,res)=>{
    try{

        const {courseId,rating,review}=req.body;

        const userId=req.user.id;

        if(!userId||!courseId||!rating||!review)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            });
        }

        const courseDetails=await Course.findOne(
                                        {
                                            _id:courseId,
                                            studentsEnrolled:{$elemMatch:{$eq:userId}},
                                        }
                                );

        if(!courseDetails)
        {
            return res.status(404).json({
                success:false,
                message:"User is not enrolled in the course"
            });
        }
        
        const alreadyReviewed=await RatingAndReview.findOne(
                                                {
                                                    user:userId,
                                                    Course:courseId
                                                });

        if(alreadyReviewed)
        {
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            });
        }


        const ratingReview=await RatingAndReview.create({
            user:userId,
            course:courseId,
            rating,
            review
        });

        await ratingReview.populate("user");


        const updatedCourse=await Course.findByIdAndUpdate(
                                                            courseId,
                                                            {
                                                                $push:{
                                                                    ratingAndReviews:ratingReview._id,
                                                                }
                                                            },
                                                            {new:true}
                                                            ).populate("ratingAndReviews");

        console.log("UpdatedCourseDetails",updatedCourse);

        return res.status(200).json({
            success:true,
            ratingReview
        });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


exports.getAverageRating=async(req,res)=>{
    try{

        const {courseId}=req.body;
        
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ]);
        

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            });  
        }

       
            return res.status(2400).json({
                success:true,
                message:"average rating is 0, no reviews yet",
                averageRating:0
            });

        

    }   
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
}

exports.getAllRating=async(req,res)=>{
    try{
        //const {courseId}=req.body;

        //const course=await Course.findById(courseId).populate("ratingAndReviews");

        const allReviews=await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName"
                                            })
                                            .exec();

        if (!allReviews) {
            return res.status(400).json({
                success:false,
                message:"No rating found yet"
            });
        }

       //const allReviews=course.ratingAndReviews;
    
        return res.status(200).json({
            success:true,
            message:"All reviews fetched succcessfully",
            data:allReviews
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

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

//        const allReviews=course.ratingAndReviews;
    
//         return res.status(400).json({
//             success:false,
//             allReviews
//         });

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }






