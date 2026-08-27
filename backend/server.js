require('dotenv').config()
const express = require('express');
const connectDB  = require('./src/config/db');
const projectRoutes = require('./src/routes/projectRoutes')
const skillRoutes = require('./src/routes/skillRoutes')
const experienceRoutes = require('./src/routes/experienceRoutes');
const authroutes = require('./src/routes/authRoutes');
const resumeRoutes  = require('./src/routes/resumeRoutes')


const app = express()
app.use(express.json())

const Port = process.env.PORT || 3000;

connectDB()

app.use('/api/project' , projectRoutes)
app.use('/api/skills' , skillRoutes )
app.use('/api/experience' , experienceRoutes)
app.use('/api/auth', authroutes)
app.use('/api/resume', resumeRoutes )

 

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
    
})