const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const cloudinary=require("cloudinary").v2;
const {uploadImageToCloudinary}=require("../utils/imageUploader");


function isOfSupportedType(fileType,supportedTypes)
{
    return supportedTypes.includes(fileType);
}



exports.createSubSection=async (req,res)=>{
    try{
        const {title,description,sectionId}=req.body;

        const video=req.files.videoFile;

        if(!title||!description||!sectionId||!video)
        {
            return res.status(400).json({
                success:false,
                message:"All field are required",
            });
        }

        const foundSection=await Section.findById(sectionId);


        if(!foundSection)
            {
                return res.status(400).json({
                    success:false,
                    message:"No section found with this id"
                });
            }
        
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });



        

        const updatedSection=await Section.findByIdAndUpdate(
                            sectionId,
                            {
                                $push:{
                                    subSection:subSectionDetails._id,
                                }
                            },
                            {new:true}
                        )
                        .populate("subSection");

        


        console.log(updatedSection);

        return res.status(200).json({
            success:true,
            message:"New subsection created successfully",
            data:updatedSection
        });


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating new SubSection",
            error:error.message 
        });
    }
}


exports.updateSubSection1=async (req,res)=>{
    // try{

    //     var { subSectionId, title="",description="" } = req.body;
    //     const video = req.files ? req.files.videoFile : null;

    //     const subSection = await SubSection.findById(subSectionId);

    //     if(!subSection)
    //         {
    //             return res.status(400).json({
    //                 success:false,
    //                 message:"No subsection found with this id"
    //             });
    //         }

    //     if(title !== undefined && title !== "") 
    //         subSection.title= title;

    //     //if (timeDuration) subSection.timeDuration = timeDuration;
    //     if (description !== undefined && description !== "")            
    //             subSection.description = description;

    //     if (video) {
    //         const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
    //         subSection.videoUrl = uploadDetails.secure_url;
    //         subSection.timeDuration=`${uploadDetails.duration}`
    //     }

    //     await subSection.save();

    //     console.log("Updated Subsection=",subSection);

    //     return res.status(200).json({
    //         success: true,
    //         message: "SubSection updated successfully",
    //         data:subSection,
    //     });
    // }
    try{

        var { subSectionId, title="",description="" } = req.body;
        const video = req.files ? req.files.videoFile : null;

        const updatedSection = await SubSection.findById(subSectionId);

        if(!updatedSection)
            {
                return res.status(400).json({
                    success:false,
                    message:"No subsection found with this id"
                });
            }

        if(title !== undefined && title !== "") 
            updatedSection.title= title;

        //if (timeDuration) subSection.timeDuration = timeDuration;
        if (description !== undefined && description !== "")            
            updatedSection.description = description;

        if (video) {
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            updatedSection.videoUrl = uploadDetails.secure_url;
            updatedSection.timeDuration=`${uploadDetails.duration}`
        }

        await updatedSection.save();

        console.log("Updated Subsection=",updatedSection);

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data:updatedSection,
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating SubSection",
            error: error.message,
        });
    }
}

  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

exports.deleteSubSection=async(req,res)=>{
    try{

        const {sectionId,subSectionId}=req.body;

        if(!sectionId||!subSectionId)
        {
            return res.status(400).json({
                success:false,
                message:"All field are required",
            });
        }

        const sbs=await SubSection.findByIdAndDelete(subSectionId);

        if(!sbs)
        {
            return res.status(404)
            .json(
            { 
                success: false, 
                message: "SubSection not found" 
            });
        }

        const updatedSection=await Section.findByIdAndUpdate(
                                {_id:sectionId},
                                {
                                    $pull:{
                                        subSection:subSectionId,
                                    }
                                },
                                {new:true}
        ).populate("subSection");

        return res.status(200).json({
            success:true,
            message:"SubSection deleted Successfully",
            data:updatedSection
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting SubSection",
            error: error.message,
        });
    }
}