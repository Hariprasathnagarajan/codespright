import api, { endpoints } from './api';

export const courseService = {
  // Get all courses with filtering
  getCourses: async (params = {}) => {
    const response = await api.get(endpoints.courses, { params });
    return response.data;
  },

  // Get course details
  getCourseDetail: async (id) => {
    const response = await api.get(endpoints.courseDetail(id));
    return response.data;
  },

  // Enroll in a course
  enrollCourse: async (courseId) => {
    const response = await api.post(endpoints.courseEnroll(courseId));
    return response.data;
  },

  // Get course progress
  getCourseProgress: async (courseId) => {
    const response = await api.get(endpoints.courseProgress(courseId));
    return response.data;
  },

  // Update lesson progress
  updateLessonProgress: async (courseId, lessonId, completed = true, progress = 100) => {
    const response = await api.post(endpoints.courseProgress(courseId), {
      lesson_id: lessonId,
      completed,
      progress
    });
    return response.data;
  },

  // Get course lessons
  getCourseLessons: async (courseId) => {
    const response = await api.get(endpoints.courseLessons(courseId));
    return response.data;
  },

  // Get lesson details
  getLessonDetail: async (courseId, lessonId) => {
    const response = await api.get(endpoints.lessonDetail(courseId, lessonId));
    return response.data;
  },

  // Search courses
  searchCourses: async (query, filters = {}) => {
    const params = {
      search: query,
      ...filters
    };
    const response = await api.get(endpoints.courses, { params });
    return response.data;
  },

  // Get user's enrolled courses
  getEnrolledCourses: async () => {
    const response = await api.get(`${endpoints.courses}enrolled/`);
    return response.data;
  },

  // Get course categories
  getCourseCategories: async () => {
    const response = await api.get(`${endpoints.courses}categories/`);
    return response.data;
  }
};