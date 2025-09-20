import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle,
  Video,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMentors([
        {
          id: 1,
          name: 'Sarah Johnson',
          title: 'Senior Frontend Engineer',
          company: 'Google',
          avatar: '/api/placeholder/100/100',
          expertise: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
          experience: '8+ years',
          location: 'San Francisco, CA',
          rating: 4.9,
          reviews: 127,
          students: 450,
          hourlyRate: 80,
          responseTime: '< 2 hours',
          languages: ['English', 'Spanish'],
          bio: 'Passionate frontend engineer with expertise in React ecosystem. I help developers master modern web technologies and advance their careers.',
          availability: 'Available',
          sessions: 1200,
          specialties: ['Career Growth', 'Technical Skills', 'Interview Prep']
        },
        {
          id: 2,
          name: 'Michael Chen',
          title: 'Data Science Manager',
          company: 'Microsoft',
          avatar: '/api/placeholder/100/100',
          expertise: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
          experience: '10+ years',
          location: 'Seattle, WA',
          rating: 4.8,
          reviews: 89,
          students: 320,
          hourlyRate: 95,
          responseTime: '< 4 hours',
          languages: ['English', 'Mandarin'],
          bio: 'Data science leader helping professionals transition into data roles and advance their analytical skills.',
          availability: 'Busy',
          sessions: 890,
          specialties: ['Data Science', 'Career Transition', 'Leadership']
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          title: 'UX Design Director',
          company: 'Airbnb',
          avatar: '/api/placeholder/100/100',
          expertise: ['UI/UX Design', 'Figma', 'Design Systems', 'Research'],
          experience: '7+ years',
          location: 'New York, NY',
          rating: 4.9,
          reviews: 156,
          students: 380,
          hourlyRate: 75,
          responseTime: '< 1 hour',
          languages: ['English', 'Portuguese'],
          bio: 'Design leader passionate about creating user-centered experiences and mentoring the next generation of designers.',
          availability: 'Available',
          sessions: 950,
          specialties: ['Design Thinking', 'Portfolio Review', 'Career Growth']
        },
        {
          id: 4,
          name: 'David Kim',
          title: 'Full Stack Architect',
          company: 'Netflix',
          avatar: '/api/placeholder/100/100',
          expertise: ['Full Stack', 'AWS', 'Microservices', 'DevOps'],
          experience: '12+ years',
          location: 'Los Angeles, CA',
          rating: 4.7,
          reviews: 203,
          students: 520,
          hourlyRate: 100,
          responseTime: '< 3 hours',
          languages: ['English', 'Korean'],
          bio: 'Experienced architect helping developers build scalable systems and advance to senior technical roles.',
          availability: 'Available',
          sessions: 1500,
          specialties: ['System Design', 'Architecture', 'Technical Leadership']
        },
        {
          id: 5,
          name: 'Lisa Wang',
          title: 'Product Manager',
          company: 'Stripe',
          avatar: '/api/placeholder/100/100',
          expertise: ['Product Management', 'Strategy', 'Analytics', 'Growth'],
          experience: '6+ years',
          location: 'Austin, TX',
          rating: 4.8,
          reviews: 94,
          students: 280,
          hourlyRate: 85,
          responseTime: '< 2 hours',
          languages: ['English'],
          bio: 'Product leader helping professionals transition into product management and develop strategic thinking skills.',
          availability: 'Available',
          sessions: 670,
          specialties: ['Product Strategy', 'Career Transition', 'Analytics']
        },
        {
          id: 6,
          name: 'Alex Thompson',
          title: 'DevOps Engineer',
          company: 'Docker',
          avatar: '/api/placeholder/100/100',
          expertise: ['DevOps', 'Kubernetes', 'CI/CD', 'Cloud'],
          experience: '9+ years',
          location: 'Remote',
          rating: 4.6,
          reviews: 78,
          students: 190,
          hourlyRate: 90,
          responseTime: '< 6 hours',
          languages: ['English', 'German'],
          bio: 'DevOps expert helping teams implement modern deployment practices and cloud infrastructure.',
          availability: 'Limited',
          sessions: 540,
          specialties: ['Infrastructure', 'Automation', 'Best Practices']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const expertiseAreas = ['all', 'Frontend', 'Backend', 'Full Stack', 'Data Science', 'Design', 'Product', 'DevOps'];
  const experienceLevels = ['all', '5+ years', '7+ years', '10+ years'];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === 'all' || 
                            mentor.expertise.some(skill => 
                              skill.toLowerCase().includes(selectedExpertise.toLowerCase()) ||
                              mentor.title.toLowerCase().includes(selectedExpertise.toLowerCase())
                            );
    
    const matchesExperience = selectedExperience === 'all' || mentor.experience === selectedExperience;
    
    return matchesSearch && matchesExpertise && matchesExperience;
  });

  if (loading) {
    return <LoadingSpinner text="Loading mentors..." />;
  }

  return (
    <div className="page-container">
      <div className="section-padding">
        <div className="content-wrapper">
          {/* Header */}
          <div className="text-center space-xl mb-16">
            <h1 className="heading-xl mb-8">Find Your Mentor</h1>
            <p className="body-lg max-w-4xl mx-auto">
              Connect with industry experts who can guide your career growth and help you achieve your professional goals.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-sm">
                <label className="form-label">Search Mentors</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by name, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input pl-12"
                  />
                </div>
              </div>

              <div className="space-sm">
                <label className="form-label">Expertise</label>
                <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    {expertiseAreas.map(area => (
                      <SelectItem key={area} value={area}>
                        {area === 'all' ? 'All Areas' : area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-sm">
                <label className="form-label">Experience</label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
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
              Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Mentors Grid */}
          <div className="grid-responsive gap-8">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="card-elevated hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="space-md">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback className="text-lg">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="heading-sm group-hover:text-gray-600 transition-colors">
                            {mentor.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600">{mentor.title}</p>
                          <p className="text-sm font-medium text-gray-900">{mentor.company}</p>
                        </div>
                        
                        <Badge 
                          variant={mentor.availability === 'Available' ? 'default' : 'secondary'}
                          className={`${
                            mentor.availability === 'Available' ? 'bg-green-100 text-green-700' :
                            mentor.availability === 'Busy' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {mentor.availability}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{mentor.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-lg">
                  <div className="space-md">
                    <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.expertise.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                    <div className="text-center space-xs">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{mentor.rating}</span>
                      </div>
                      <p className="text-xs text-gray-600">{mentor.reviews} reviews</p>
                    </div>
                    
                    <div className="text-center space-xs">
                      <div className="font-medium text-gray-900">{mentor.students}</div>
                      <p className="text-xs text-gray-600">students mentored</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="space-xs">
                      <span className="text-2xl font-light text-gray-900">
                        ${mentor.hourlyRate}
                      </span>
                      <span className="text-sm text-gray-600">/hour</span>
                      <p className="text-xs text-gray-500">
                        Responds in {mentor.responseTime}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button className="btn-primary">
                        <Video className="w-4 h-4 mr-2" />
                        Book Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="heading-md mb-4">No mentors found</h3>
              <p className="body-md mb-8">
                Try adjusting your search criteria or browse all mentors.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedExpertise('all');
                  setSelectedExperience('all');
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

export default Mentorship;