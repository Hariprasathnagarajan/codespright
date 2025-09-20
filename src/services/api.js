import axios from 'axios';

// Django API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance for Django backend
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh and error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Django REST API endpoints
export const endpoints = {
  // Authentication (Django REST Auth)
  login: '/auth/login/',
  register: '/auth/register/',
  logout: '/auth/logout/',
  refresh: '/auth/token/refresh/',
  profile: '/auth/user/',
  passwordReset: '/auth/password/reset/',
  passwordResetConfirm: '/auth/password/reset/confirm/',
  
  // Courses
  courses: '/courses/',
  courseDetail: (id) => `/courses/${id}/`,
  courseEnroll: (id) => `/courses/${id}/enroll/`,
  courseProgress: (id) => `/courses/${id}/progress/`,
  courseLessons: (id) => `/courses/${id}/lessons/`,
  lessonDetail: (courseId, lessonId) => `/courses/${courseId}/lessons/${lessonId}/`,
  
  // Mentorship
  mentors: '/mentors/',
  mentorDetail: (id) => `/mentors/${id}/`,
  mentorshipRequests: '/mentorship/requests/',
  mentorshipSessions: '/mentorship/sessions/',
  sessionBook: '/mentorship/sessions/book/',
  
  // Communication/Chat
  chatRooms: '/chat/rooms/',
  chatMessages: (roomId) => `/chat/rooms/${roomId}/messages/`,
  conversations: '/chat/conversations/',
  
  // Analytics & Dashboard
  dashboard: '/analytics/dashboard/',
  progress: '/analytics/progress/',
  userStats: '/analytics/user-stats/',
};