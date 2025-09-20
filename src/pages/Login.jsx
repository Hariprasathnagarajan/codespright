import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, GraduationCap, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      showSuccess('Welcome back! Login successful.');
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const demoAccounts = [
    { email: 'student@demo.com', password: 'demo123', role: 'Student', color: 'bg-blue-100 text-blue-700' },
    { email: 'mentor@demo.com', password: 'demo123', role: 'Mentor', color: 'bg-green-100 text-green-700' },
    { email: 'admin@demo.com', password: 'demo123', role: 'Admin', color: 'bg-purple-100 text-purple-700' }
  ];

  const fillDemoAccount = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-12 pr-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">EduPlatform</h1>
                <p className="text-lg text-gray-600">Professional Learning</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                Welcome Back to Your
                <br />
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Continue building your skills with our comprehensive courses and expert mentorship. 
                Your professional growth awaits.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Secure Access</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your account and learning progress are protected with enterprise-grade security.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-6 h-6 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Instant Access</h3>
                <p className="text-gray-600 leading-relaxed">
                  Resume your courses exactly where you left off and continue your learning journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-lg mx-auto lg:mx-0">
          <Card className="border-0 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8 pt-12 px-8 sm:px-12">
              <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">EduPlatform</span>
              </div>
              
              <CardTitle className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                Sign In
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Access your learning dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 sm:px-12 pb-12">
              {/* Demo Accounts */}
              <div className="mb-8">
                <Label className="text-sm font-semibold text-gray-700 mb-4 block">
                  Quick Demo Access
                </Label>
                <div className="space-y-3">
                  {demoAccounts.map((account, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => fillDemoAccount(account.email, account.password)}
                      className="w-full justify-start h-auto p-4 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all group"
                    >
                      <div className={`w-10 h-10 ${account.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-105 transition-transform`}>
                        <span className="font-semibold text-sm">{account.role.charAt(0)}</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-base">{account.role} Demo</div>
                        <div className="text-sm text-gray-500">{account.email}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="mb-8" />

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-12 h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-12 pr-12 h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-lg p-2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-base text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;