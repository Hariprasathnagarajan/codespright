import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showInfo = (message) => {
    toast.info(message);
  };

  const showWarning = (message) => {
    toast.warning(message);
  };

  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const value = {
    notifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    addNotification,
    removeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};