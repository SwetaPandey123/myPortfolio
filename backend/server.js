require('dotenv').config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const projectRoutes = require('./src/routes/projectRoutes')
const skillRoutes = require('./src/routes/skillRoutes')
const experienceRoutes = require('./src/routes/experienceRoutes');
const authroutes = require('./src/routes/authRoutes');
const resumeRoutes = require('./src/routes/resumeRoutes')
const messageRoutes = require('./src/routes/messageRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Port = process.env.PORT || 3000;

connectDB()

// Root health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Portfolio API is running successfully!"
    });
});

// Dedicated /health and /api/health endpoints
const healthCheckHandler = (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Backend server is healthy and running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
};

app.get('/health', healthCheckHandler);
app.get('/api/health', healthCheckHandler);

app.use('/api/project', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/auth', authroutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/upload', uploadRoutes)

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})