import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  BookOpen, 
  Users, 
  MessageCircle, 
  BarChart3, 
  Bell, 
  Search,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Mentorship', href: '/mentorship', icon: Users, auth: true },
    { name: 'Community', href: '/chat', icon: MessageCircle, auth: true },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, auth: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-medium text-gray-900">EduPlatform</span>
              <span className="text-sm text-gray-500 -mt-1">Professional Learning</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => {
              if (item.auth && !isAuthenticated) return null;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors py-2 px-1 ${
                    active 
                      ? 'text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="flex items-center space-x-5">
                {/* Search */}
                <Button variant="ghost" size="sm" className="p-3 hover:bg-gray-100 rounded-xl">
                  <Search className="w-6 h-6 text-gray-600" />
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-3 hover:bg-gray-100 rounded-xl">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">3</span>
                  </div>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                      <Avatar className="h-12 w-12 shadow-md">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gray-100 text-gray-700 font-medium text-lg">
                          {user?.name?.charAt(0) || user?.email?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-6 rounded-2xl shadow-xl border-0 mt-2" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal p-0 mb-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 shadow-md">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="bg-gray-100 text-gray-700 text-xl">
                            {user?.name?.charAt(0) || user?.email?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <p className="text-lg font-medium text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                          <Badge variant="outline" className="text-sm px-3 py-1">
                            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-4" />
                    <DropdownMenuItem asChild className="cursor-pointer p-4 rounded-xl">
                      <Link to="/profile" className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-gray-600" />
                        <span className="text-base">Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer p-4 rounded-xl">
                      <Link to="/dashboard" className="flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5 text-gray-600" />
                        <span className="text-base">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer p-4 rounded-xl">
                      <Settings className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-base">Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-4" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="cursor-pointer p-4 rounded-xl text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="text-base">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/login">
                  <Button variant="ghost" className="text-base font-medium text-gray-600 hover:text-gray-900 px-6 py-3">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white text-base font-medium px-8 py-3 rounded-xl shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-gray-600" />
              ) : (
                <Menu className="h-7 w-7 text-gray-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-8">
            <div className="space-y-6">
              {navigation.map((item) => {
                if (item.auth && !isAuthenticated) return null;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-6 py-4 text-lg font-medium rounded-xl transition-colors ${
                      active 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <div className="pt-8 border-t border-gray-100 space-y-6">
                  <div className="flex items-center px-6 py-4 space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gray-100 text-gray-700">
                        {user?.name?.charAt(0) || user?.email?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-6 py-4 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-6 py-4 text-lg font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-8 border-t border-gray-100 space-y-6">
                  <Link
                    to="/login"
                    className="block px-6 py-4 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-6 py-4 text-lg font-medium bg-gray-900 text-white hover:bg-gray-800 rounded-xl transition-colors text-center shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;