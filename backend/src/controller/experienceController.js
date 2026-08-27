const ExperienceModel = require('../models/ExperienceModel')



const GetExperience = async(req , res)=>{
    try {
        const GetAllExperience = await ExperienceModel.find();
        res.status(200).json({
            success : true ,
            message : "All Experience data fetched successfully" ,
            data : GetAllExperience
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}
const createExprience = async(req , res)=>{
    try {
        let { title , organization , description , startDate , endDate , current , type , location} = req.body;

        if(!title){
            return res.status(400).json({
                success : false,
                message : "bad request , enter credentials "
            })
        }
        const CreateExperience = await ExperienceModel.create({
                title,
                organization,
                description,
                startDate,
                endDate,
                current,
                type,
                location
            })
            return res.status(201).json({
                success : true,
                message : "Experience created successfully",
                data : CreateExperience
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}

const UpdateExperience = async (req , res)=>{
    try {
        let {id} = req.params;
        let updatedExperience = req.body;

        const UpdateExperience =  await  ExperienceModel.findByIdAndUpdate(id , updatedExperience , {new : true})

        return res.status(200).json({
            success : true,
            message : "Experience is updated successfully ",
            data : updatedExperience
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        }) 
    }
}
const DeleteExperience = async (req , res)=>{
    try{
        let {id} = req.params;

        const DeleteExperience = await ExperienceModel.findByIdAndDelete(id)
        return res.status(200).json({
            success : true,
            message : "experience Delete sucessfully",
            data : DeleteExperience
        })
    }catch(error){
      res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })   
    }
}




module.exports = {GetExperience , createExprience , UpdateExperience , DeleteExperience}