import api, { endpoints } from './api';

export const authService = {
  // Login with Django backend
  login: async (email, password) => {
    const response = await api.post(endpoints.login, {
      email,
      password
    });
    return response.data;
  },

  // Register new user
  register: async (name, email, password, role = 'student') => {
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ') || '';
    
    const response = await api.post(endpoints.register, {
      email,
      password1: password,
      password2: password,
      first_name: firstName,
      last_name: lastName,
      role
    });
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get(endpoints.profile);
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.patch(endpoints.profile, profileData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await api.post(endpoints.logout, { refresh: refreshToken });
      } catch (error) {
        console.log('Logout error:', error);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await api.post(endpoints.refresh, { 
      refresh: refreshToken 
    });
    return response.data;
  },

  // Password reset
  requestPasswordReset: async (email) => {
    const response = await api.post(endpoints.passwordReset, { email });
    return response.data;
  },

  // Confirm password reset
  confirmPasswordReset: async (uid, token, newPassword) => {
    const response = await api.post(endpoints.passwordResetConfirm, {
      uid,
      token,
      new_password1: newPassword,
      new_password2: newPassword
    });
    return response.data;
  }
};