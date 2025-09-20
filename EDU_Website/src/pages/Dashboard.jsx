import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BookOpen,
  Users,
  MessageCircle,
  TrendingUp,
  Clock,
  Award,
  Target,
  Calendar,
  Play,
  ArrowRight,
  Star,
  CheckCircle,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    coursesEnrolled: 5,
    coursesCompleted: 2,
    totalLearningTime: 48,
    currentStreak: 7,
    upcomingDeadlines: 3,
    mentoringSessions: 12
  });

  const [recentCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      progress: 75,
      nextLesson: 'State Management with Redux',
      timeLeft: '2h 30m',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Michael Chen',
      progress: 45,
      nextLesson: 'Color Theory and Typography',
      timeLeft: '1h 45m',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Data Science with Python',
      instructor: 'Emily Rodriguez',
      progress: 20,
      nextLesson: 'Introduction to Pandas',
      timeLeft: '3h 15m',
      thumbnail: '/api/placeholder/300/200'
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Mentoring Session with John Doe',
      type: 'mentoring',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '1 hour'
    },
    {
      id: 2,
      title: 'React Project Deadline',
      type: 'deadline',
      date: '2024-01-18',
      time: '11:59 PM',
      course: 'Advanced React Development'
    },
    {
      id: 3,
      title: 'Live Q&A Session',
      type: 'live',
      date: '2024-01-20',
      time: '3:00 PM',
      instructor: 'Sarah Johnson'
    }
  ]);

  const [achievements] = useState([
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: Award,
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'Week Streak',
      description: '7 days of continuous learning',
      icon: Target,
      earned: true,
      date: '2024-01-14'
    },
    {
      id: 3,
      title: 'Fast Learner',
      description: 'Complete 3 courses in a month',
      icon: TrendingUp,
      earned: false,
      progress: 67
    }
  ]);

  return (
    <div className="page-container">
      <div className="section-padding-sm">
        <div className="content-wrapper">
          {/* Header */}
          <div className="space-xl mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-md lg:space-y-0">
              <div className="space-md">
                <h1 className="heading-lg">
                  Welcome back, {user?.name?.split(' ')[0] || 'Learner'}!
                </h1>
                <p className="body-lg">
                  Continue your learning journey and track your progress
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button className="btn-secondary">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/mentorship">
                  <Button className="btn-primary">
                    <Users className="w-5 h-5 mr-2" />
                    Find Mentor
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid-responsive-4 mb-16">
            <Card className="card-elevated">
              <CardContent className="card-content-padding">
                <div className="flex items-center justify-between">
                  <div className="space-sm">
                    <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                    <p className="text-3xl font-light text-gray-900">{stats.coursesEnrolled}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="card-content-padding">
                <div className="flex items-center justify-between">
                  <div className="space-sm">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-3xl font-light text-gray-900">{stats.coursesCompleted}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="card-content-padding">
                <div className="flex items-center justify-between">
                  <div className="space-sm">
                    <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                    <p className="text-3xl font-light text-gray-900">{stats.totalLearningTime}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="card-content-padding">
                <div className="flex items-center justify-between">
                  <div className="space-sm">
                    <p className="text-sm font-medium text-gray-600">Current Streak</p>
                    <p className="text-3xl font-light text-gray-900">{stats.currentStreak} days</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid-responsive-2 gap-12">
            {/* Continue Learning */}
            <div className="space-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="heading-md">Continue Learning</h2>
                <Link to="/courses">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="space-lg">
                {recentCourses.map((course) => (
                  <Card key={course.id} className="card-elevated hover:shadow-xl transition-all duration-300">
                    <CardContent className="card-content-padding">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-full sm:w-32 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 space-md">
                          <div className="space-sm">
                            <h3 className="heading-sm">{course.title}</h3>
                            <p className="text-sm text-gray-600">by {course.instructor}</p>
                          </div>
                          
                          <div className="space-sm">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-xs">
                              <p className="text-sm font-medium text-gray-900">Next: {course.nextLesson}</p>
                              <p className="text-sm text-gray-600">{course.timeLeft} remaining</p>
                            </div>
                            
                            <Button className="btn-primary w-full sm:w-auto">
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-xl">
              {/* Upcoming Events */}
              <Card className="card-elevated mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-md">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                      <div className="flex-1 space-xs">
                        <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                        {event.duration && (
                          <p className="text-xs text-gray-500">{event.duration}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-md">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={achievement.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1 space-xs">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                            {achievement.earned && (
                              <Badge variant="secondary" className="text-xs">Earned</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {!achievement.earned && achievement.progress && (
                            <div className="mt-2">
                              <Progress value={achievement.progress} className="h-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;