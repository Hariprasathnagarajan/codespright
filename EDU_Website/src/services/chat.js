import api, { endpoints } from './api';

export const chatService = {
  // Get all chat rooms
  getChatRooms: async () => {
    const response = await api.get(endpoints.chatRooms);
    return response.data;
  },

  // Get chat messages for a room
  getChatMessages: async (roomId, page = 1) => {
    const response = await api.get(endpoints.chatMessages(roomId), {
      params: { page }
    });
    return response.data;
  },

  // Send a message
  sendMessage: async (roomId, message, messageType = 'text') => {
    const response = await api.post(endpoints.chatMessages(roomId), {
      content: message,
      message_type: messageType
    });
    return response.data;
  },

  // Create a new chat room
  createChatRoom: async (name, description, isPrivate = false) => {
    const response = await api.post(endpoints.chatRooms, {
      name,
      description,
      is_private: isPrivate
    });
    return response.data;
  },

  // Join a chat room
  joinChatRoom: async (roomId) => {
    const response = await api.post(`${endpoints.chatRooms}${roomId}/join/`);
    return response.data;
  },

  // Leave a chat room
  leaveChatRoom: async (roomId) => {
    const response = await api.post(`${endpoints.chatRooms}${roomId}/leave/`);
    return response.data;
  },

  // Get conversations (direct messages)
  getConversations: async () => {
    const response = await api.get(endpoints.conversations);
    return response.data;
  },

  // Start a conversation with a user
  startConversation: async (userId) => {
    const response = await api.post(endpoints.conversations, {
      participant: userId
    });
    return response.data;
  },

  // Get conversation messages
  getConversationMessages: async (conversationId, page = 1) => {
    const response = await api.get(`${endpoints.conversations}${conversationId}/messages/`, {
      params: { page }
    });
    return response.data;
  },

  // Send message in conversation
  sendConversationMessage: async (conversationId, message) => {
    const response = await api.post(`${endpoints.conversations}${conversationId}/messages/`, {
      content: message
    });
    return response.data;
  },

  // Mark messages as read
  markMessagesAsRead: async (roomId) => {
    const response = await api.post(`${endpoints.chatMessages(roomId)}mark_read/`);
    return response.data;
  }
};