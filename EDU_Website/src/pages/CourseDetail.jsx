import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play,
  Download,
  Share,
  Heart,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Award
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse({
        id: parseInt(id),
        title: 'Advanced React Development',
        description: 'Master modern React patterns, hooks, and state management with real-world projects. This comprehensive course covers everything from basic concepts to advanced techniques used in production applications.',
        longDescription: 'This course is designed for developers who want to take their React skills to the next level. You\'ll learn advanced patterns, performance optimization techniques, and how to build scalable applications that can handle complex state management and user interactions.',
        instructor: {
          name: 'Sarah Johnson',
          title: 'Senior Frontend Engineer at Google',
          avatar: '/api/placeholder/100/100',
          bio: 'Sarah has over 8 years of experience in frontend development and has worked on large-scale React applications at top tech companies.',
          students: 15000,
          courses: 12,
          rating: 4.9
        },
        category: 'Frontend',
        level: 'Advanced',
        duration: '12 weeks',
        totalHours: 48,
        students: 2847,
        rating: 4.9,
        reviewCount: 523,
        price: 149,
        originalPrice: 199,
        thumbnail: '/api/placeholder/800/450',
        tags: ['React', 'JavaScript', 'Hooks', 'Redux', 'TypeScript'],
        whatYouWillLearn: [
          'Advanced React patterns and best practices',
          'State management with Redux and Context API',
          'Performance optimization techniques',
          'Testing React applications',
          'Building scalable component architectures',
          'Working with TypeScript in React',
          'Server-side rendering with Next.js',
          'Deploying React applications'
        ],
        requirements: [
          'Basic knowledge of React and JavaScript',
          'Understanding of ES6+ features',
          'Familiarity with npm/yarn package manager',
          'Basic understanding of HTML and CSS'
        ],
        curriculum: [
          {
            id: 1,
            title: 'Advanced React Patterns',
            lessons: 8,
            duration: '6 hours',
            topics: [
              'Higher-Order Components',
              'Render Props Pattern',
              'Compound Components',
              'Custom Hooks'
            ]
          },
          {
            id: 2,
            title: 'State Management',
            lessons: 6,
            duration: '4.5 hours',
            topics: [
              'Redux Fundamentals',
              'Redux Toolkit',
              'Context API',
              'State Normalization'
            ]
          },
          {
            id: 3,
            title: 'Performance Optimization',
            lessons: 5,
            duration: '4 hours',
            topics: [
              'React.memo and useMemo',
              'Code Splitting',
              'Lazy Loading',
              'Bundle Optimization'
            ]
          },
          {
            id: 4,
            title: 'Testing',
            lessons: 4,
            duration: '3 hours',
            topics: [
              'Unit Testing with Jest',
              'Component Testing',
              'Integration Testing',
              'E2E Testing'
            ]
          }
        ],
        studentReviews: [
          {
            id: 1,
            user: 'Michael Chen',
            avatar: 'MC',
            rating: 5,
            date: '2024-01-15',
            comment: 'Excellent course! Sarah explains complex concepts in a very clear way. The projects are practical and helped me understand advanced React patterns.'
          },
          {
            id: 2,
            user: 'Emily Rodriguez',
            avatar: 'ER',
            rating: 5,
            date: '2024-01-10',
            comment: 'This course took my React skills to the next level. The performance optimization section was particularly valuable for my work projects.'
          },
          {
            id: 3,
            user: 'David Kim',
            avatar: 'DK',
            rating: 4,
            date: '2024-01-08',
            comment: 'Great content and well-structured. Would recommend to any React developer looking to advance their skills.'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <LoadingSpinner text="Loading course details..." />;
  }

  if (!course) {
    return (
      <div className="page-container">
        <div className="section-padding">
          <div className="content-wrapper text-center">
            <h1 className="heading-lg mb-4">Course not found</h1>
            <p className="body-md mb-8">The course you're looking for doesn't exist.</p>
            <Link to="/courses">
              <Button className="btn-primary">Browse Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="section-padding">
        <div className="content-wrapper">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/courses" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Courses
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-xl">
              {/* Course Header */}
              <div className="space-lg">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant="outline">{course.category}</Badge>
                  <Badge 
                    variant="secondary"
                    className={`${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}
                  >
                    {course.level}
                  </Badge>
                </div>

                <h1 className="heading-xl mb-6">{course.title}</h1>
                <p className="body-lg mb-8">{course.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.totalHours} hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-8">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(course.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900">{course.rating}</span>
                  <span className="text-gray-600">({course.reviewCount} reviews)</span>
                </div>

                <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center mb-8">
                  <div className="text-center space-md">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Course Preview</p>
                  </div>
                </div>
              </div>

              {/* Course Content Tabs */}
              <Tabs defaultValue="overview" className="space-lg">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-lg">
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>What you'll learn</CardTitle>
                    </CardHeader>
                    <CardContent className="space-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-sm">
                      {course.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-gray-700">{requirement}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Course Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-lg">
                  {course.curriculum.map((section, index) => (
                    <Card key={section.id} className="card-elevated">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            Section {index + 1}: {section.title}
                          </CardTitle>
                          <Badge variant="outline">
                            {section.lessons} lessons • {section.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-sm">
                        {section.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 py-2">
                            <Play className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="space-lg">
                  <Card className="card-elevated">
                    <CardContent className="card-content-padding">
                      <div className="flex items-start space-x-6">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={course.instructor.avatar} />
                          <AvatarFallback className="text-xl">
                            {course.instructor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-md">
                          <div>
                            <h3 className="heading-sm">{course.instructor.name}</h3>
                            <p className="text-gray-600">{course.instructor.title}</p>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.instructor.students.toLocaleString()} students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.instructor.courses} courses</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{course.instructor.rating} rating</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700">{course.instructor.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-lg">
                  {course.studentReviews.map((review) => (
                    <Card key={review.id} className="card-elevated">
                      <CardContent className="card-content-padding">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback>{review.avatar}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-sm">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{review.user}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-xl">
              <Card className="card-elevated sticky top-8">
                <CardContent className="card-content-padding">
                  <div className="space-lg">
                    <div className="text-center space-md">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-3xl font-light text-gray-900">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      {course.originalPrice && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Save ${course.originalPrice - course.price}
                        </Badge>
                      )}
                    </div>

                    <Button className="btn-primary w-full text-lg py-4">
                      {isEnrolled ? (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-5 h-5 mr-2" />
                          Enroll Now
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <Heart className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>

                    <div className="space-sm pt-6 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-4">This course includes:</h4>
                      <div className="space-sm text-sm text-gray-600">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4" />
                          <span>{course.totalHours} hours of video content</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Download className="w-4 h-4" />
                          <span>Downloadable resources</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="w-4 h-4" />
                          <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-4 h-4" />
                          <span>Access to community</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;