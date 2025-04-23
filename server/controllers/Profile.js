const Profile=require("../models/Profile");
const User=require("../models/User");
const Course=require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const {convertSecondsToDuration} =require("../utils/secToDuration");
// const Profile = require("../models/Profile")
const CourseProgress = require("../models/CourseProgress")

exports.updateProfile=async (req,res)=>{
    try{

        const {gender,dateOfBirth="",about="",contactNumber}=req.body;

        const userId=req.user.id;

        if(!about||!dateOfBirth||!userId)
        {
            return res.status(400).json({
                success:false,
                message:"About,ContactNumber,userId are Required"
            });
        }

        const users=await User.findById(userId);

        const profileId=users.additionalDetails;

        if(!profileId)
        {
            return res.status(400).json({
                success:false,
                message:"ProfileId is required",
            });
        }

        const profile=await Profile.findById(profileId);

        if(gender)
        {
            profile.gender=gender;
        }

        if(dateOfBirth) 
        profile.dateOfBirth=dateOfBirth;

        if(about)   
        profile.about=about;

        if(contactNumber) 
        profile.contactNumber=contactNumber;

        await profile.save();

        const updatedUserDetails=await User.findById(userId).populate("additionalDetails");

        return res.status(200).json({
            success:true,
            message:"Profile updated Successfully",
            updatedUserDetails,
        });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while Updating Profile",
            error: error.message,
        });
    }
}

exports.deleteAccount=async (req,res)=>{
    try{

        console.log(req.user);

        const userId=req.user.id;

        const user=await User.findById(userId);

        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User not Found",
            });
        }

        const profileId=user.additionalDetails;

        await Profile.findByIdAndDelete({_id:user.additionalDetails});

        if(req.user.accountType==="Student")
        {
            await Promise.all(

              user.courses.map(async (courseId)=>{
                  
                  const course=await Course.findByIdAndUpdate({_id:courseId},
                                                              {
                                                                  $pull:{
                                                                      studentsEnrolled:userId,
                                                                  }
                                                              },
                                                              {new:true}
                  );
      
                  console.log("Updated Course after removing the user",course);
      
              })
          )
        }

        

        

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message:"User successfully deleted",
        });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting Account",
            error: error.message,
        });
    }
}

exports.getAllUserDetails=async (req,res)=>{
    try{

        const userId=req.user.id;

        const userDetails=await User.findById(userId).populate("additionalDetails");

        return res.status(200).json({
            success:true,
            message:"UserDetails fetched successfully",
            userDetails,
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching all the details of user",
            error: error.message,
        });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    console.log("yes update profile req received");
    try {
      if (!req.files || !req.files.displayPicture) {
        return res.status(409).json({
          success: false,
          message: "No file uploaded",
        });
      }
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedUserDetails = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        updatedUserDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "fat gya picture upate krte backend me",
      })
    }
};
  
// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       const userId = req.user.id
//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//         .populate("courses")
//         .exec()
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userDetails}`,
//         })
//       }
//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };


exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completeVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
