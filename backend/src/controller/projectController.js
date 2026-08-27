const ProjectModel = require("../models/projectModel")

const GetAllProject = async (req, res) => {
    try {
        const Project = await ProjectModel.find().sort({createdAt : -1});
        res.status(200).json({
            success: true,
            message: "all Project fetched successfull",
            data: Project
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}

const CreateProject = async (req, res) => {
    try {
        let { title, descriptions, description, techStack, imageURL, liveLINK, gitHub, featured } = req.body;

        const projectDescription = descriptions || description;

        if (!title || !projectDescription || !techStack) {
            return res.status(400).json({
                success: false,
                message: "all feild are required"
            })
        }

        const CreateProject = await ProjectModel.create({
            title,
            descriptions: projectDescription,
            techStack,
            imageURL,
            liveLINK,
            gitHub,
            featured
        })
        return res.status(201).json({
            success: true,
            message: "Project created Successfull",
            data: CreateProject
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}


const UpdateProject = async (req, res) => {
    try {
        let { id } = req.params;

        let updates = req.body;
        if (updates.description && !updates.descriptions) {
            updates.descriptions = updates.description;
        }

        const UpdateProject = await ProjectModel.findByIdAndUpdate(id, updates, { new: true })

        if (!UpdateProject) {
            return res.status(404).json({ success: false, message: "Project not found" })
        }

        res.status(200).json({
            success: true,
            message: "project Updated successfully",
            data: UpdateProject
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })
    }
}

const DeleteProject = async (req , res)=>{
    try {

        const {id} = req.params

        const DeleteProject = await ProjectModel.findByIdAndDelete(id)

        if(!DeleteProject){
            return res.status(404).json({
                success : false,
                message : "project not found"
            })
        }
        return res.status(200).json({
            success :true,
            message : "Project Deleted Sucessfully "
        }) 
        
        
    } catch (error) {
       res.status(500).json({
            success: false,
            message: "internal server error",
            data: error.message
        })    
    }
}


module.exports = { GetAllProject, CreateProject  , UpdateProject , DeleteProject }