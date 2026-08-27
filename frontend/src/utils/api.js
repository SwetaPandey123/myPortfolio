import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://myportfolio-owi0.onrender.com';

const API = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Public API endpoints with safe fallbacks
export const fetchProjects = async () => {
    try {
        const response = await API.get('/api/project');
        return response.data;
    } catch (err) {
        console.warn('Projects API fallback used:', err.message);
        return { success: false, data: [] };
    }
};

export const fetchSkills = async () => {
    try {
        const response = await API.get('/api/skills');
        return response.data;
    } catch (err) {
        console.warn('Skills API fallback used:', err.message);
        return { success: false, data: [] };
    }
};

export const fetchExperience = async () => {
    try {
        const response = await API.get('/api/experience');
        return response.data;
    } catch (err) {
        console.warn('Experience API fallback used:', err.message);
        return { success: false, data: [] };
    }
};

export const fetchResume = async () => {
    try {
        const response = await API.get('/api/resume/view');
        return response.data;
    } catch (err) {
        console.warn('Resume API fallback used:', err.message);
        return { success: false, data: { resumeURL: "https://drive.google.com/file/d/13CZZdx_fuHoAYd8mAdk6JQH3ZkuD2fi4/view?usp=drive_link" } };
    }
};

export const fetchBlogs = async () => {
    try {
        const response = await API.get('/api/blog');
        return response.data;
    } catch (err) {
        console.warn('Blog API fallback used:', err.message);
        return { success: false, data: [] };
    }
};

export const fetchBlogById = async (id) => {
    try {
        const response = await API.get(`/api/blog/${id}`);
        return response.data;
    } catch (err) {
        console.warn('Blog detail API fallback used:', err.message);
        return { success: false, data: null };
    }
};

export const sendMessage = async (data) => {
    const response = await API.post('/api/message/send', data);
    return response.data;
};

// Admin API endpoints
export const loginAdmin = async (email, password) => {
    const response = await API.post('/api/auth/login', { email, password });
    return response.data;
};

export const verifyAdminOtp = async (otp) => {
    const response = await API.post('/api/auth/verifyOtp', { otp });
    return response.data;
};

export const resendAdminOtp = async () => {
    const response = await API.post('/api/auth/resend-otp');
    return response.data;
};

export const createProject = async (data) => {
    const response = await API.post('/api/project/create', data);
    return response.data;
};

export const updateProject = async (id, data) => {
    const response = await API.put(`/api/project/update/${id}`, data);
    return response.data;
};

export const deleteProject = async (id) => {
    const response = await API.delete(`/api/project/delete/${id}`);
    return response.data;
};

export const createSkill = async (data) => {
    const response = await API.post('/api/skills/create', data);
    return response.data;
};

export const updateSkill = async (id, data) => {
    const response = await API.put(`/api/skills/update/${id}`, data);
    return response.data;
};

export const deleteSkill = async (id) => {
    const response = await API.delete(`/api/skills/delete/${id}`);
    return response.data;
};

export const createExperience = async (data) => {
    const response = await API.post('/api/experience/create', data);
    return response.data;
};

export const updateExperience = async (id, data) => {
    const response = await API.put(`/api/experience/update/${id}`, data);
    return response.data;
};

export const deleteExperience = async (id) => {
    const response = await API.delete(`/api/experience/delete/${id}`);
    return response.data;
};

export const createBlog = async (data) => {
    const response = await API.post('/api/blog/create', data);
    return response.data;
};

export const updateBlog = async (id, data) => {
    const response = await API.put(`/api/blog/update/${id}`, data);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await API.delete(`/api/blog/delete/${id}`);
    return response.data;
};

export const updateResume = async (url) => {
    const response = await API.put('/api/resume/update', { url });
    return response.data;
};

export const fetchMessages = async () => {
    const response = await API.get('/api/message');
    return response.data;
};

export const deleteMessage = async (id) => {
    const response = await API.delete(`/api/message/${id}`);
    return response.data;
};

export default API;
