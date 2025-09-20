import api, { endpoints } from './api';

export const analyticsService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get(endpoints.dashboard);
    return response.data;
  },

  // Get user progress report
  getProgressReport: async (timeframe = 'month') => {
    const response = await api.get(endpoints.progress, {
      params: { timeframe }
    });
    return response.data;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get(endpoints.userStats);
    return response.data;
  },

  // Get course analytics
  getCourseAnalytics: async (courseId) => {
    const response = await api.get(`${endpoints.courseDetail(courseId)}analytics/`);
    return response.data;
  },

  // Get learning streak
  getLearningStreak: async () => {
    const response = await api.get(`${endpoints.userStats}streak/`);
    return response.data;
  },

  // Get achievement progress
  getAchievements: async () => {
    const response = await api.get(`${endpoints.userStats}achievements/`);
    return response.data;
  },

  // Get time spent analytics
  getTimeSpentAnalytics: async (period = 'week') => {
    const response = await api.get(`${endpoints.userStats}time-spent/`, {
      params: { period }
    });
    return response.data;
  },

  // Get skill progress
  getSkillProgress: async () => {
    const response = await api.get(`${endpoints.userStats}skills/`);
    return response.data;
  },

  // Get mentor analytics (for mentors)
  getMentorAnalytics: async () => {
    const response = await api.get(`${endpoints.userStats}mentor/`);
    return response.data;
  },

  // Get platform-wide statistics (for admins)
  getPlatformStats: async () => {
    const response = await api.get(`${endpoints.dashboard}platform/`);
    return response.data;
  }
};