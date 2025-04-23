const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection=async (req,res)=>{
    try{

        const {sectionName,courseId}=req.body;

        if(!sectionName||!courseId)
        {
            return res.status(400).json({
                success:false,
                message:"All Fields are Required"
            });
        }

        const courseInfo=await Course.findById(courseId);

        if(!courseInfo)
        {
            return res.status(400).json({
                success:false,
                message:"No course with this Id is present"
            });
        }

        const newSection=await Section.create({
            sectionName,
        });

        const updatedCourse=await Course.findByIdAndUpdate(
                            {_id:courseId},
                            {
                                $push:{
                                    courseContent:newSection._id,
                                }
                            },
                            {new:true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection", 
            }
        })
        .exec();
        
        return res.status(200).json({
            success:true,
            message:"New setion created",
            updatedCourse
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating new Section",
            error:error.message
        });
    }

    // try {
    //         // Extract the required properties from the request body
    //         const { sectionName, courseId } = req.body;
    
    //         // Validate the input
    //         if (!sectionName || !courseId) {
    //             return res.status(400).json({
    //                 success: false,
    //                 message: "Missing required properties",
    //             });
    //         }
    
    //         // Create a new section with the given name
    //         const newSection = await Section.create({ sectionName });
    
    //         // Add the new section to the course's content array
    //         const updatedCourse = await Course.findByIdAndUpdate(
    //             courseId,
    //             {
    //                 $push: {
    //                     courseContent: newSection._id,
    //                 },
    //             },
    //             { new: true }
    //         )
    //             .populate({
    //                 path: "courseContent",
    //                 populate: {
    //                     path: "subSection",
    //                 },
    //             })
    //             .exec();
    
    //         // Return the updated course object in the response
    //         res.status(200).json({
    //             success: true,
    //             message: "Section created successfully",
    //             updatedCourse,
    //         });
    //     } catch (error) {
    //         // Handle errors
    //         res.status(500).json({
    //             success: false,
    //             message: "Internal server error",
    //             error: error.message,
    //         });
    //     }
}

exports.updateSection1=async (req,res)=>{
    try{

        const {sectionName,sectionId}=req.body;

        if(!sectionName||!sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"All Fields are Required"
            });
        }

        const updatedSection=await Section.findByIdAndUpdate(
                                    {_id:sectionId},
                                    {
                                        sectionName:sectionName
                                    },
                                    {new:true}
                                );


                                return res.status(200).json({
                                    success:true,
                                    message:"Setion Updated Successfully",
                                    updatedSection
                                });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating the Section",
            error:error.message
        });
    }
}

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId,courseId } = req.body;
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();

        res.status(200).json({
            success: true,
            message: section,
            data:course,
        });
    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


exports.deleteSection1=async(req,res)=>{
    try{

        const {sectionId,courseId}=req.body;

        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and Course ID are required",
            });
        }
        
        const sectionExists = await Section.findById(sectionId);

        if (!sectionExists) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const updatedCourse=await Course.findByIdAndUpdate(courseId,
                                                            {
                                                                $pull:{
                                                                    courseContent:sectionId
                                                                }
                                                            },
                                                            {new:true}
        );

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            updatedCourse
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting the Section",
            error:error.message
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {

        const { sectionId, courseId }  = req.body;
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        if(!section) {
            return res.status(404).json({
                success:false,
                message:"Section not Found",
            })
        }

        //delete sub section
        await SubSection.deleteMany({_id: {$in: section.subSection}});

        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return 
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();

        res.status(200).json({
            success:true,
            message:"Section deleted",
            data:course
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};   