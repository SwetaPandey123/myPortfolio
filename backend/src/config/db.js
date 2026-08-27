
const mongoose = require('mongoose')

 const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB is connected')
    } catch (error) {
        console.log("error in mongoDB",error);
    }
}
module.exports =  connectDB