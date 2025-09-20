import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Award,
  BookOpen,
  Clock,
  Target
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    interests: []
  });

  const [stats] = useState({
    coursesCompleted: 12,
    totalHours: 156,
    certificates: 8,
    currentStreak: 15,
    achievements: 24
  });

  const [achievements] = useState([
    { id: 1, title: 'First Course Completed', date: '2024-01-15', icon: Award },
    { id: 2, title: '7-Day Learning Streak', date: '2024-01-20', icon: Target },
    { id: 3, title: '50 Hours Learned', date: '2024-01-25', icon: Clock },
    { id: 4, title: 'JavaScript Master', date: '2024-02-01', icon: BookOpen }
  ]);

  const [recentActivity] = useState([
    { id: 1, type: 'course_completed', title: 'Advanced React Development', date: '2024-02-10' },
    { id: 2, type: 'certificate_earned', title: 'JavaScript Fundamentals Certificate', date: '2024-02-08' },
    { id: 3, type: 'course_started', title: 'Data Science with Python', date: '2024-02-05' },
    { id: 4, type: 'achievement_unlocked', title: '100 Hours Learning Milestone', date: '2024-02-03' }
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      bio: '',
      skills: [],
      interests: []
    });
    setIsEditing(false);
  };

  return (
    <div className="page-container">
      <div className="section-padding-sm">
        <div className="content-wrapper">
          {/* Header */}
          <div className="space-xl mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-md lg:space-y-0">
              <h1 className="heading-lg">My Profile</h1>
              
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="btn-secondary">
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-4">
                  <Button onClick={handleSave} className="btn-primary">
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Info */}
            <div className="space-xl">
              <Card className="card-elevated">
                <CardContent className="card-content-padding text-center">
                  <div className="space-lg">
                    <div className="relative inline-block">
                      <Avatar className="w-32 h-32 mx-auto shadow-lg">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-3xl">
                          {user?.name?.charAt(0) || user?.email?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 shadow-lg"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-md">
                      {isEditing ? (
                        <div className="space-sm">
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input text-center text-xl font-medium"
                            placeholder="Your name"
                          />
                        </div>
                      ) : (
                        <div>
                          <h2 className="text-2xl font-medium text-gray-900">{user?.name}</h2>
                          <p className="text-gray-600">{user?.email}</p>
                        </div>
                      )}
                      
                      <Badge variant="outline" className="text-sm px-4 py-2">
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </Badge>
                    </div>

                    {isEditing ? (
                      <div className="space-md text-left">
                        <div className="form-field">
                          <Label htmlFor="email" className="form-label">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-field">
                          <Label htmlFor="phone" className="form-label">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Your phone number"
                          />
                        </div>
                        
                        <div className="form-field">
                          <Label htmlFor="location" className="form-label">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Your location"
                          />
                        </div>
                        
                        <div className="form-field">
                          <Label htmlFor="bio" className="form-label">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Tell us about yourself..."
                            rows={4}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-sm text-left">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{user?.email}</span>
                        </div>
                        {formData.phone && (
                          <div className="flex items-center space-x-3 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{formData.phone}</span>
                          </div>
                        )}
                        {formData.location && (
                          <div className="flex items-center space-x-3 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{formData.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Joined January 2024</span>
                        </div>
                      </div>
                    )}

                    {formData.bio && !isEditing && (
                      <div className="pt-6 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-left">{formData.bio}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Learning Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center space-xs">
                      <div className="text-2xl font-light text-gray-900">{stats.coursesCompleted}</div>
                      <p className="text-sm text-gray-600">Courses Completed</p>
                    </div>
                    <div className="text-center space-xs">
                      <div className="text-2xl font-light text-gray-900">{stats.totalHours}</div>
                      <p className="text-sm text-gray-600">Hours Learned</p>
                    </div>
                    <div className="text-center space-xs">
                      <div className="text-2xl font-light text-gray-900">{stats.certificates}</div>
                      <p className="text-sm text-gray-600">Certificates</p>
                    </div>
                    <div className="text-center space-xs">
                      <div className="text-2xl font-light text-gray-900">{stats.currentStreak}</div>
                      <p className="text-sm text-gray-600">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-xl">
              <Tabs defaultValue="activity" className="space-lg">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="space-lg">
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest learning activities and milestones</CardDescription>
                    </CardHeader>
                    <CardContent className="space-md">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                          <div className="flex-1 space-xs">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {activity.type === 'course_completed' && '🎉 Completed: '}
                              {activity.type === 'certificate_earned' && '🏆 Earned: '}
                              {activity.type === 'course_started' && '📚 Started: '}
                              {activity.type === 'achievement_unlocked' && '⭐ Unlocked: '}
                              {activity.title}
                            </h4>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-lg">
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Achievements</CardTitle>
                      <CardDescription>Your learning milestones and accomplishments</CardDescription>
                    </CardHeader>
                    <CardContent className="space-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {achievements.map((achievement) => {
                          const Icon = achievement.icon;
                          return (
                            <div key={achievement.id} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl">
                              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                                <Icon className="w-6 h-6 text-yellow-600" />
                              </div>
                              <div className="flex-1 space-xs">
                                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                                <p className="text-sm text-gray-600">Earned on {achievement.date}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-lg">
                  <div className="space-lg">
                    <Card className="card-elevated">
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences and security</CardDescription>
                      </CardHeader>
                      <CardContent className="space-lg">
                        <div className="space-md">
                          <div className="flex items-center justify-between py-4 border-b border-gray-100">
                            <div>
                              <h4 className="font-medium text-gray-900">Email Notifications</h4>
                              <p className="text-sm text-gray-600">Receive updates about your courses and progress</p>
                            </div>
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                          
                          <div className="flex items-center justify-between py-4 border-b border-gray-100">
                            <div>
                              <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                              <p className="text-sm text-gray-600">Control who can see your profile and activity</p>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                          
                          <div className="flex items-center justify-between py-4 border-b border-gray-100">
                            <div>
                              <h4 className="font-medium text-gray-900">Change Password</h4>
                              <p className="text-sm text-gray-600">Update your account password</p>
                            </div>
                            <Button variant="outline" size="sm">Change</Button>
                          </div>
                          
                          <div className="flex items-center justify-between py-4">
                            <div>
                              <h4 className="font-medium text-red-600">Delete Account</h4>
                              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;