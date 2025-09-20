import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Search,
  Filter,
  Play,
  ArrowRight
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'Advanced React Development',
          description: 'Master modern React patterns, hooks, and state management with real-world projects.',
          instructor: 'Sarah Johnson',
          category: 'Frontend',
          level: 'Advanced',
          duration: '12 weeks',
          students: 2847,
          rating: 4.9,
          reviews: 523,
          price: 149,
          thumbnail: '/api/placeholder/400/250',
          tags: ['React', 'JavaScript', 'Hooks', 'Redux']
        },
        {
          id: 2,
          title: 'Data Science with Python',
          description: 'Learn data analysis, visualization, and machine learning with Python and popular libraries.',
          instructor: 'Dr. Michael Chen',
          category: 'Data Science',
          level: 'Intermediate',
          duration: '16 weeks',
          students: 1923,
          rating: 4.8,
          reviews: 341,
          price: 199,
          thumbnail: '/api/placeholder/400/250',
          tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
        },
        {
          id: 3,
          title: 'UI/UX Design Fundamentals',
          description: 'Create beautiful and user-friendly interfaces with design thinking and modern tools.',
          instructor: 'Emily Rodriguez',
          category: 'Design',
          level: 'Beginner',
          duration: '8 weeks',
          students: 3421,
          rating: 4.7,
          reviews: 687,
          price: 99,
          thumbnail: '/api/placeholder/400/250',
          tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research']
        },
        {
          id: 4,
          title: 'Full-Stack Web Development',
          description: 'Build complete web applications from frontend to backend with modern technologies.',
          instructor: 'John Smith',
          category: 'Full Stack',
          level: 'Intermediate',
          duration: '20 weeks',
          students: 1567,
          rating: 4.9,
          reviews: 298,
          price: 249,
          thumbnail: '/api/placeholder/400/250',
          tags: ['Node.js', 'Express', 'MongoDB', 'React']
        },
        {
          id: 5,
          title: 'Mobile App Development with React Native',
          description: 'Create cross-platform mobile apps using React Native and modern development practices.',
          instructor: 'Lisa Wang',
          category: 'Mobile',
          level: 'Advanced',
          duration: '14 weeks',
          students: 892,
          rating: 4.6,
          reviews: 156,
          price: 179,
          thumbnail: '/api/placeholder/400/250',
          tags: ['React Native', 'Mobile', 'iOS', 'Android']
        },
        {
          id: 6,
          title: 'Digital Marketing Mastery',
          description: 'Learn effective digital marketing strategies, SEO, social media, and analytics.',
          instructor: 'David Brown',
          category: 'Marketing',
          level: 'Beginner',
          duration: '10 weeks',
          students: 2156,
          rating: 4.5,
          reviews: 423,
          price: 129,
          thumbnail: '/api/placeholder/400/250',
          tags: ['SEO', 'Social Media', 'Analytics', 'Content Marketing']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['all', 'Frontend', 'Backend', 'Full Stack', 'Data Science', 'Design', 'Mobile', 'Marketing'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return <LoadingSpinner text="Loading courses..." />;
  }

  return (
    <div className="page-container">
      <div className="section-padding">
        <div className="content-wrapper">
          {/* Header */}
          <div className="text-center space-xl mb-16">
            <h1 className="heading-xl mb-8">Explore Our Courses</h1>
            <p className="body-lg max-w-4xl mx-auto">
              Discover comprehensive courses designed by industry experts to help you master new skills and advance your career.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-sm">
                <label className="form-label">Search Courses</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by title, instructor, or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input pl-12"
                  />
                </div>
              </div>

              <div className="space-sm">
                <label className="form-label">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-sm">
                <label className="form-label">Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-8">
            <p className="body-md">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid-responsive gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="card-elevated hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video bg-gray-100 rounded-t-2xl flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                
                <CardHeader className="space-md">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="text-xs px-3 py-1">
                      {course.category}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-3 py-1 ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      {course.level}
                    </Badge>
                  </div>
                  
                  <CardTitle className="heading-sm group-hover:text-gray-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="body-md">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-lg">
                  <div className="space-sm">
                    <p className="text-sm font-medium text-gray-900">
                      by {course.instructor}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(course.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {course.rating}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({course.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="space-xs">
                      <span className="text-2xl font-light text-gray-900">
                        ${course.price}
                      </span>
                    </div>
                    
                    <Link to={`/courses/${course.id}`}>
                      <Button className="btn-primary">
                        <Play className="w-4 h-4 mr-2" />
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="heading-md mb-4">No courses found</h3>
              <p className="body-md mb-8">
                Try adjusting your search criteria or browse all courses.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
                className="btn-secondary"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;