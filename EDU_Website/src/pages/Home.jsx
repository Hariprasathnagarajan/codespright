import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  MessageCircle, 
  BarChart3, 
  Star, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Award,
  TrendingUp,
  Shield,
  Clock,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with comprehensive, up-to-date curriculum designed for real-world application.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Personal Mentorship',
      description: 'Get one-on-one guidance from experienced mentors who understand your learning goals and career aspirations.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics, achievements, and personalized recommendations.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'All content is verified by industry experts and regularly updated to maintain the highest standards.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Active Students', value: '50,000+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Expert Mentors', value: '2,500+', icon: Award, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Courses Available', value: '800+', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Success Rate', value: '96%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Google',
      content: 'The structured learning path and mentor support helped me transition from marketing to software engineering in just 8 months.',
      rating: 5,
      avatar: 'SC',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Data Scientist',
      company: 'Microsoft',
      content: 'Excellent course quality and practical projects. The mentorship program was invaluable for my career growth.',
      rating: 5,
      avatar: 'MR',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Emily Johnson',
      role: 'Product Manager',
      company: 'Spotify',
      content: 'The learning experience is outstanding. Clear explanations, practical examples, and supportive community.',
      rating: 5,
      avatar: 'EJ',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-12">
            <div className="space-y-8">
              <Badge variant="outline" className="px-6 py-3 text-base font-medium border-gray-200 text-gray-600 mx-auto bg-white/80 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 50,000+ learners worldwide
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light text-gray-900 leading-tight tracking-tight max-w-6xl mx-auto">
                  Master New Skills
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Build Your Future
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-4">
                  Join our comprehensive learning platform where expert instruction meets 
                  personalized mentorship to accelerate your professional growth.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-2xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                    Continue Learning
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-2xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                      Start Learning Today
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400 px-12 py-6 text-lg rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl">
                      <Play className="mr-3 h-6 w-6" />
                      Browse Courses
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-20">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center space-y-4 group">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bg} rounded-2xl mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl lg:text-4xl font-light text-gray-900">{stat.value}</div>
                      <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-8 tracking-tight">
              Why Choose Our Platform
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-4">
              We provide a comprehensive learning experience designed to help you achieve 
              your professional goals efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white to-gray-50 hover:scale-105">
                    <CardContent className="p-8 lg:p-10">
                      <div className="space-y-6">
                        <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-8 tracking-tight">
              Student Success Stories
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-4">
              Hear from professionals who have transformed their careers through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white/80 backdrop-blur-sm hover:scale-105 group">
                <CardContent className="p-8 lg:p-10 space-y-6">
                  <div className="flex items-center space-x-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-base lg:text-lg text-gray-700 leading-relaxed font-light italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4 pt-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${testimonial.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-lg font-semibold text-white">{testimonial.avatar}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-400/30 to-blue-400/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
                Ready to Start Learning?
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto px-4">
                Join thousands of professionals who are advancing their careers 
                through our comprehensive learning platform.
              </p>
            </div>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-lg rounded-2xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                    <Zap className="mr-3 h-6 w-6" />
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="border-2 border-gray-400 text-gray-300 hover:bg-white/10 hover:border-gray-300 hover:text-white px-12 py-6 text-lg rounded-2xl font-semibold transition-all">
                    <Target className="mr-3 h-6 w-6" />
                    View All Courses
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;