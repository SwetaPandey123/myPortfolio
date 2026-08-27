const SkillsModel = require('../models/SkillModel')


const GetAllSkill = async(req , res)=>{
    try {
        const AllSkills = await SkillsModel.find();
        return res.status(200).json({
            success : true,
            message : "all skill fetched sucessfully ",
            data : AllSkills
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        }) 
    }
}
const createSkill = async (req , res)=>{
    try {
        let {Name , proficiency ,category , icon} = req.body;

        if (!Name || !proficiency || !category || !icon){
            return res.status(400).json({
                success : false ,
                message : "invalid credential",
            })
        }
        const createSkill = await SkillsModel.create({
            Name,
            proficiency,
            category,
            icon
        })

        return res.status(201).json({
            success : true,
            message : "skill created sucessfully",
            data : createSkill
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}
const updateskill = async( req , res)=>{
    try {
        let {id} = req.params;
        let update = req.body;

        const updatedskill = await SkillsModel.findByIdAndUpdate(id, update , {new : true})
        return res.status(200).json({
            success : true,
            message : "skill updated sucessfully",
            data : updatedskill
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}
const DeletSkill = async (req , res) =>{
    try {
        let {id} = req.params;
        const deleteskills = await SkillsModel.findByIdAndDelete(id);
        return res.status(200).json({
            success : true ,
            message :"skill delete successfully",
            data : deleteskills
        })
        
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}
module.exports = {GetAllSkill , createSkill  , updateskill , DeletSkill }