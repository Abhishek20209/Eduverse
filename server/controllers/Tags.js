const Tag=require("../models/Tags");

exports.createTag=async(req,res)=>{
    try{

        const {name,description}=req.body;

        if(!name||!description)
        {
            return res.statua(400).json({
                success:false,
                message:"All fields are required to create a tag"
            });
        }

        const tagDetails=await Tag.create({
            name:name,
            description:description
        });

        console.log(tagDetails);

        return res.status(200).json({
            success:true,
            message:"Tag created successfully",
        })
    }
    catch(error){
        return res.statua(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.showAllTags=async (req,res)=>{
    try{

        const allTags=await Tag.find({},{name:true, description:true });

        if(!allTags)
        {
            return res.statua(400).json({
                success:false,
                message:"All fields are required to create a tag"
            });
        }

        return res.status(200).json({
            success:true,
            message:"All tags returned Successfully",
            allTags
        })
    }
    catch(error){
        return res.statua(500).json({
            success:false,
            message:"something went wrong while fetching all the tags"
        });
    }
}
