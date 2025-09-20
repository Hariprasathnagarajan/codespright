import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Users, 
  Plus,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile
} from 'lucide-react';

const Chat = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const [chats] = useState([
    {
      id: 1,
      type: 'direct',
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'Thanks for the React tips! Really helpful.',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      online: true,
      role: 'Mentor'
    },
    {
      id: 2,
      type: 'direct',
      name: 'Michael Chen',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'The data science project looks great!',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      online: false,
      role: 'Student'
    },
    {
      id: 3,
      type: 'group',
      name: 'React Developers',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'Emily: Has anyone tried the new React 18 features?',
      lastMessageTime: '3 hours ago',
      unreadCount: 5,
      members: 24,
      online: true
    },
    {
      id: 4,
      type: 'group',
      name: 'Data Science Study Group',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'Alex: Meeting tomorrow at 3 PM',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      members: 12,
      online: false
    },
    {
      id: 5,
      type: 'direct',
      name: 'Emily Rodriguez',
      avatar: '/api/placeholder/50/50',
      lastMessage: 'Your portfolio design is amazing!',
      lastMessageTime: '2 days ago',
      unreadCount: 1,
      online: true,
      role: 'Mentor'
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 'sarah',
        senderName: 'Sarah Johnson',
        content: 'Hi! I saw your question about React hooks. Happy to help!',
        timestamp: '10:30 AM',
        type: 'text'
      },
      {
        id: 2,
        senderId: user?.id,
        senderName: user?.name,
        content: 'Thank you so much! I\'m struggling with useEffect dependencies.',
        timestamp: '10:32 AM',
        type: 'text'
      },
      {
        id: 3,
        senderId: 'sarah',
        senderName: 'Sarah Johnson',
        content: 'The key is to include all values from component scope that are used inside useEffect. Let me share a quick example...',
        timestamp: '10:35 AM',
        type: 'text'
      },
      {
        id: 4,
        senderId: user?.id,
        senderName: user?.name,
        content: 'Thanks for the React tips! Really helpful.',
        timestamp: '10:45 AM',
        type: 'text'
      }
    ]
  });

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: user?.id,
      senderName: user?.name,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));

    setMessage('');
  };

  const currentMessages = selectedChat ? messages[selectedChat.id] || [] : [];

  return (
    <div className="page-container">
      <div className="section-padding-sm">
        <div className="content-wrapper">
          <div className="h-[calc(100vh-12rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-80 border-r border-gray-100 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium text-gray-900">Messages</h2>
                    <Button size="sm" className="rounded-full w-8 h-8 p-0">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10 border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-100' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback>
                              {chat.type === 'group' ? (
                                <Users className="w-6 h-6" />
                              ) : (
                                chat.name.split(' ').map(n => n[0]).join('')
                              )}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && chat.type === 'direct' && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                              {chat.role && (
                                <Badge variant="outline" className="text-xs">
                                  {chat.role}
                                </Badge>
                              )}
                              {chat.type === 'group' && (
                                <span className="text-xs text-gray-500">({chat.members})</span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            {chat.unreadCount > 0 && (
                              <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedChat.avatar} />
                            <AvatarFallback>
                              {selectedChat.type === 'group' ? (
                                <Users className="w-5 h-5" />
                              ) : (
                                selectedChat.name.split(' ').map(n => n[0]).join('')
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-gray-900">{selectedChat.name}</h3>
                            <p className="text-sm text-gray-500">
                              {selectedChat.type === 'group' 
                                ? `${selectedChat.members} members` 
                                : selectedChat.online ? 'Online' : 'Last seen 2 hours ago'
                              }
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {currentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                            msg.senderId === user?.id ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            {msg.senderId !== user?.id && (
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {msg.senderName?.split(' ').map(n => n[0]).join('') || 'U'}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`px-4 py-2 rounded-2xl ${
                              msg.senderId === user?.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${
                                msg.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-6 border-t border-gray-100">
                      <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                        <Button type="button" variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        
                        <div className="flex-1 relative">
                          <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="pr-12 h-12 border-gray-200 rounded-xl"
                          />
                          <Button type="button" variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 p-0">
                            <Smile className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <Button type="submit" className="rounded-full w-12 h-12 p-0">
                          <Send className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MessageCircle className="w-16 h-16 text-gray-300 mx-auto" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                        <p className="text-gray-600">Choose a chat from the sidebar to start messaging</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;