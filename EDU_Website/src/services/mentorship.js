import api, { endpoints } from './api';

export const mentorshipService = {
  // Get all mentors
  getMentors: async (params = {}) => {
    const response = await api.get(endpoints.mentors, { params });
    return response.data;
  },

  // Get mentor details
  getMentorDetail: async (id) => {
    const response = await api.get(endpoints.mentorDetail(id));
    return response.data;
  },

  // Request mentorship
  requestMentorship: async (mentorId, message) => {
    const response = await api.post(endpoints.mentorshipRequests, {
      mentor: mentorId,
      message
    });
    return response.data;
  },

  // Get mentorship requests
  getMentorshipRequests: async () => {
    const response = await api.get(endpoints.mentorshipRequests);
    return response.data;
  },

  // Accept/Reject mentorship request
  updateMentorshipRequest: async (requestId, status) => {
    const response = await api.patch(`${endpoints.mentorshipRequests}${requestId}/`, {
      status
    });
    return response.data;
  },

  // Get mentorship sessions
  getMentorshipSessions: async () => {
    const response = await api.get(endpoints.mentorshipSessions);
    return response.data;
  },

  // Book a mentorship session
  bookSession: async (sessionData) => {
    const response = await api.post(endpoints.sessionBook, sessionData);
    return response.data;
  },

  // Cancel a session
  cancelSession: async (sessionId) => {
    const response = await api.delete(`${endpoints.mentorshipSessions}${sessionId}/`);
    return response.data;
  },

  // Update session status
  updateSessionStatus: async (sessionId, status) => {
    const response = await api.patch(`${endpoints.mentorshipSessions}${sessionId}/`, {
      status
    });
    return response.data;
  },

  // Get mentor availability
  getMentorAvailability: async (mentorId) => {
    const response = await api.get(`${endpoints.mentorDetail(mentorId)}availability/`);
    return response.data;
  },

  // Search mentors
  searchMentors: async (query, filters = {}) => {
    const params = {
      search: query,
      ...filters
    };
    const response = await api.get(endpoints.mentors, { params });
    return response.data;
  }
};