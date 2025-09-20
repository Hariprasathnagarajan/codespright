import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, GraduationCap } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="section-padding">
        <div className="content-wrapper">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center space-lg mb-12">
              <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-medium text-gray-900">EduPlatform</span>
              </Link>
              
              <div className="space-md">
                <h1 className="heading-lg">Create your account</h1>
                <p className="body-md">
                  Join thousands of learners advancing their careers
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <Card className="card-elevated">
              <CardHeader className="text-center pb-8">
                <CardTitle className="heading-sm">Sign Up</CardTitle>
                <CardDescription className="body-md">
                  Fill in your details to get started
                </CardDescription>
              </CardHeader>
              
              <CardContent className="card-content-padding pt-0">
                <form onSubmit={handleSubmit} className="space-lg">
                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-700 text-sm">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="form-field">
                    <Label htmlFor="name" className="form-label">
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input pl-12"
                        placeholder="Enter your full name"
                        required
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="form-field">
                    <Label htmlFor="email" className="form-label">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input pl-12"
                        placeholder="Enter your email"
                        required
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="form-field">
                    <Label htmlFor="role" className="form-label">
                      I want to
                    </Label>
                    <Select value={formData.role} onValueChange={handleRoleChange}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Learn new skills</SelectItem>
                        <SelectItem value="mentor">Teach and mentor others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-field">
                    <Label htmlFor="password" className="form-label">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input pl-12 pr-12"
                        placeholder="Create a password"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-field">
                    <Label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-input pl-12 pr-12"
                        placeholder="Confirm your password"
                        required
                      />
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus:ring-2 mt-0.5"
                        required
                      />
                      <span className="text-gray-600 leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-gray-900 hover:text-gray-700 font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-gray-900 hover:text-gray-700 font-medium">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sign In Link */}
            <div className="text-center mt-8">
              <p className="body-md">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;